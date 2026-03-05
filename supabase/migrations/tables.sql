-- Create reviews table (public-facing, no auth required)
CREATE TABLE
    public.reviews (
        id UUID NOT NULL DEFAULT gen_random_uuid () PRIMARY KEY,
        name TEXT NOT NULL,
        rating INTEGER NOT NULL CHECK (
            rating >= 1
            AND rating <= 5
        ),
        text TEXT NOT NULL,
        created_at TIMESTAMP
        WITH
            TIME ZONE NOT NULL DEFAULT now ()
    );

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read reviews" ON public.reviews FOR
SELECT
    USING (true);

CREATE POLICY "Anyone can insert reviews" ON public.reviews FOR INSERT
WITH
    CHECK (true);

-- Create quote_requests table (public-facing, no auth required)
CREATE TABLE
    public.quote_requests (
        id UUID NOT NULL DEFAULT gen_random_uuid () PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        flooring_type TEXT,
        sqft TEXT,
        message TEXT,
        created_at TIMESTAMP
        WITH
            TIME ZONE NOT NULL DEFAULT now ()
    );

ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert quote requests" ON public.quote_requests FOR INSERT
WITH
    CHECK (true);