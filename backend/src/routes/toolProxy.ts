import { createProxyMiddleware } from 'http-proxy-middleware';
import express from 'express';
const router = express.Router();

router.use('/tools/job/:jobId/ui', async (req, res, next) => {
  // Lookup containerPort from jobId in DB
  const jobId = req.params.jobId;
  const containerPort = await getPortByJobId(jobId); // implement this
  return createProxyMiddleware({
    target: `http://127.0.0.1:${containerPort}`,
    changeOrigin: true,
    pathRewrite: { [`^/tools/job/${jobId}/ui`]: '' }
  })(req, res, next);
});

export default router;