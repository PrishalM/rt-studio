const termsArray = [
  { id: 0, term: "Aliquip laborum esse consequat pariatur sit." },
  {
    id: 1,
    term: "Mollit mollit cupidatat reprehenderit eu est dolore dolore reprehenderit.",
  },
  { id: 2, term: "Laborum laboris labore ipsum sint id labore ea." },

  {
    id: 3,
    term: "Est mollit cillum officia ullamco et ut dolore duis reprehenderit laboris ex dolore elit.",
  },
  { id: 4, term: "Nulla laboris pariatur occaecat enim aute id dolore ex." },
];

export default function Home() {
  const termsList = termsArray.map((item) => (
    <li key={item.id}>{item.term}</li>
  ));
  return (
    <div>
      <h2>Terms & Conditions and Privacy Policy </h2>
      <ol>{termsList}</ol>
    </div>
  );
}
