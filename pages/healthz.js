function Healthz() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  res.setHeader("Content-Type", "text/plain");
  // we send the XML to the browser
  res.write("OK");
  res.end();

  return {
    props: {},
  };
}

export default Healthz;
