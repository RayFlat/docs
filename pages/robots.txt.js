function generateRobots() {
  return `# Global rules for all bots
User-agent: *
Allow: /

# English section rules
User-agent: *
Allow: /en/


# Spanish section rules
User-agent: *
Allow: /es/

Sitemap: https://www.rayflat.com/sitemap.xml`;
}

function Robots() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  const robots = generateRobots();

  res.setHeader("Content-Type", "text/plain");
  res.write(robots);
  res.end();

  return {
    props: {},
  };
}

export default Robots;
