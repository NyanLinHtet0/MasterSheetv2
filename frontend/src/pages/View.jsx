function View({ corps = [] }) {
  return (
    <section>
      <pre style={{ display: 'none' }}>{JSON.stringify(corps)}</pre>
    </section>
  );
}

export default View;
