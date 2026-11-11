import { EquipmentExplorer } from "@/components/equipment-explorer";
export function HomeSolutions() {
  return (
    <section id="solutions" className="section container v2-solution-section">
      <div className="v2-section-heading">
        <div>
          <span className="eyebrow">Four product lines</span>
          <h2>
            Explore our
            <br />
            product range.
          </h2>
        </div>
        <p>
          From street lighting to the entrance gate.
          <br />
          Explore each line, compare the options,
          <br />
          and bring us your project requirements.
        </p>
      </div>
      <EquipmentExplorer />
    </section>
  );
}
