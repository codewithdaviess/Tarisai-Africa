type ExperienceSectionSubHeadingProps = {
  children: React.ReactNode;
};

export default function ExperienceSectionSubHeading({
  children,
}: ExperienceSectionSubHeadingProps) {
  return (
    <p className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-brand/90">
     {children}
    </p>
  );
}
