function requestLogger(req, res, next) {
  const start = Date.now();

  console.log(
    `[START] ${new Date().toISOString()} | ${req.method} ${
      req.originalUrl
    } | IP: ${req.ip}`
  );

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(
      `[END] ${new Date().toISOString()} | ${req.method} ${
        req.originalUrl
      } | Status: ${res.statusCode} | ${duration}ms`
    );
  });

  next();
}

module.exports = requestLogger;
