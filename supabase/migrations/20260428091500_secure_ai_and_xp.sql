-- Protect profile XP/rank from direct client writes and expose a narrow RPC.

CREATE OR REPLACE FUNCTION public.calculate_rank(total_xp integer)
RETURNS text
LANGUAGE plpgsql
IMMUTABLE
AS $$
BEGIN
  IF total_xp >= 501 THEN
    RETURN 'Legend';
  ELSIF total_xp >= 301 THEN
    RETURN 'Elite';
  ELSIF total_xp >= 151 THEN
    RETURN 'Hacker';
  ELSIF total_xp >= 51 THEN
    RETURN 'Apprentice';
  END IF;

  RETURN 'Script Kiddie';
END;
$$;

CREATE OR REPLACE FUNCTION public.guard_profile_progress_fields()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF (NEW.xp IS DISTINCT FROM OLD.xp OR NEW.rank IS DISTINCT FROM OLD.rank)
     AND COALESCE(current_setting('app.allow_profile_progress_update', true), 'false') <> 'true' THEN
    RAISE EXCEPTION 'xp and rank can only be changed through award_xp()';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS guard_profile_progress_fields ON public.profiles;

CREATE TRIGGER guard_profile_progress_fields
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.guard_profile_progress_fields();

CREATE OR REPLACE FUNCTION public.award_xp(xp_delta integer)
RETURNS TABLE (xp integer, rank text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  target_user_id uuid := auth.uid();
BEGIN
  IF target_user_id IS NULL THEN
    RAISE EXCEPTION 'authentication required';
  END IF;

  IF xp_delta IS NULL OR xp_delta < 1 OR xp_delta > 25 THEN
    RAISE EXCEPTION 'invalid xp increment';
  END IF;

  PERFORM set_config('app.allow_profile_progress_update', 'true', true);

  UPDATE public.profiles
  SET
    xp = profiles.xp + xp_delta,
    rank = public.calculate_rank(profiles.xp + xp_delta)
  WHERE id = target_user_id
  RETURNING profiles.xp, profiles.rank
  INTO xp, rank;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'profile not found';
  END IF;

  RETURN NEXT;
END;
$$;

GRANT EXECUTE ON FUNCTION public.award_xp(integer) TO authenticated;
