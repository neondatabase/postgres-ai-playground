import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  analytics: true,
  limiter: Ratelimit.slidingWindow(2, '5s'),
});
