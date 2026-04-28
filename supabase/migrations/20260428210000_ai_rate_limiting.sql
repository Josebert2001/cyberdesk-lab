-- Tracks AI API calls per user for rate limiting in the edge function.
CREATE TABLE public.ai_requests (
  id         UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id    UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.ai_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own ai requests"
  ON public.ai_requests FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own ai requests"
  ON public.ai_requests FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Index for fast per-user time-window queries.
CREATE INDEX ai_requests_user_window_idx
  ON public.ai_requests (user_id, created_at DESC);

-- Prune records older than 1 hour to keep the table small.
CREATE OR REPLACE FUNCTION public.cleanup_ai_requests()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.ai_requests
  WHERE created_at < now() - interval '1 hour';
END;
$$;
