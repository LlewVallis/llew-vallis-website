export default function MarkdownDiagram({
  children: svgCode,
}: {
  children: string;
}) {
  const index = svgCode.match(/<svg/)?.index ?? 0;
  svgCode = svgCode.substring(index);

  return (
    <div
      className="flex justify-center my-4"
      dangerouslySetInnerHTML={{ __html: svgCode }}
    />
  );
}
