import { useState, type KeyboardEvent } from "react";
import type { CompanyMissionValue } from "@/content/company";

type CompanyMissionWheelProps = {
  values: CompanyMissionValue[];
  centerLabel: string;
  ariaLabel?: string;
};

const CX = 330;
const CY = 300;
const RI = 82;
const RD = 224;
const RMID = (RI + RD) / 2; // true radial midpoint = 153
const RICR = 12;
const LABEL_FONT_SIZE = 13;
const LABEL_LINE_HEIGHT = 16;
const ICON_GAP = 10; // px between bottom of icon circle and top of label block
const GAP = 0.032;

const polar = (radius: number, angle: number): [number, number] => [
  CX + radius * Math.cos(angle),
  CY + radius * Math.sin(angle),
];

const formatCoord = (value: number) => value.toFixed(2);

const buildPath = (index: number, segmentAngle: number, startAngle: number) => {
  const angleStart = startAngle + index * segmentAngle + GAP;
  const angleEnd = startAngle + (index + 1) * segmentAngle - GAP;
  const largeArc = angleEnd - angleStart > Math.PI ? 1 : 0;
  const [innerStartX, innerStartY] = polar(RI, angleStart);
  const [outerStartX, outerStartY] = polar(RD, angleStart);
  const [outerEndX, outerEndY] = polar(RD, angleEnd);
  const [innerEndX, innerEndY] = polar(RI, angleEnd);

  return [
    "M",
    `${formatCoord(innerStartX)},${formatCoord(innerStartY)}`,
    "L",
    `${formatCoord(outerStartX)},${formatCoord(outerStartY)}`,
    "A",
    `${RD},${RD} 0 ${largeArc},1 ${formatCoord(outerEndX)},${formatCoord(outerEndY)}`,
    "L",
    `${formatCoord(innerEndX)},${formatCoord(innerEndY)}`,
    "A",
    `${RI},${RI} 0 ${largeArc},0 ${formatCoord(innerStartX)},${formatCoord(innerStartY)}Z`,
  ].join(" ");
};

const CompanyMissionWheel = ({
  values,
  centerLabel,
  ariaLabel = "Interactive values wheel",
}: CompanyMissionWheelProps) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  const segmentCount = values.length;
  const segmentAngle = (Math.PI * 2) / segmentCount;
  const startAngle = -Math.PI / 2 - segmentAngle / 2;

  const toggleValue = (index: number) => {
    setActiveIndex((currentIndex) => (currentIndex === index ? -1 : index));
  };

  const handleKeyDown = (event: KeyboardEvent<SVGGElement>, index: number) => {
    if (event.key === "Enter" || event.key === " " || event.key === "Spacebar") {
      event.preventDefault();
      toggleValue(index);
    }
  };

  return (
    <svg
      className="company-mission-wheel"
      viewBox="0 0 600 600"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={ariaLabel}
    >
      <g>
        {values.map((value, index) => {
          const isActive = index === activeIndex;
          const isHovered = index === hoveredIndex;
          const midAngle = startAngle + (index + 0.5) * segmentAngle;
          const [groupX, groupY] = polar(RMID, midAngle);
          const motionDistance = isActive ? 8 : isHovered ? 4 : 0;
          const translateX = Math.cos(midAngle) * motionDistance;
          const translateY = Math.sin(midAngle) * motionDistance;
          const segmentScale = isActive ? 1.02 : isHovered ? 1.01 : 1;
          const segmentTransform = `translate(${formatCoord(translateX)}px, ${formatCoord(translateY)}px) scale(${segmentScale})`;
          // Total group height: icon diameter + gap + label block
          const labelBlockHeight = value.labelLines.length * LABEL_LINE_HEIGHT;
          const groupHeight = RICR * 2 + ICON_GAP + labelBlockHeight;
          // Center the group around groupY
          const iconCY = groupY - groupHeight / 2 + RICR;
          const labelTopY = iconCY + RICR + ICON_GAP;
          // First baseline = labelTopY + ascender (~0.72 of font size)
          const labelBaseY = labelTopY + LABEL_FONT_SIZE * 0.72;

          return (
            <g
              key={value.id}
              className={`company-mission-segment${isActive ? " is-active" : ""}${isHovered ? " is-hovered" : ""}`}
              role="button"
              tabIndex={0}
              aria-label={value.labelLines.join(" ")}
              aria-pressed={isActive}
              onClick={() => toggleValue(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex((currentIndex) => (currentIndex === index ? -1 : currentIndex))}
              onFocus={() => setHoveredIndex(index)}
              onBlur={() => setHoveredIndex((currentIndex) => (currentIndex === index ? -1 : currentIndex))}
              style={{
                transformBox: "view-box",
                transformOrigin: `${CX}px ${CY}px`,
                transform: segmentTransform,
              }}
            >
              <path
                d={buildPath(index, segmentAngle, startAngle)}
                fill={isActive ? value.activeColor : value.inactiveColor}
                stroke={isActive || isHovered ? "rgba(255,255,255,.98)" : "rgba(255,255,255,.9)"}
                strokeWidth={isActive ? 4.4 : isHovered ? 4.15 : 3.9}
                strokeLinejoin="round"
              />

              <g aria-hidden="true">
                {value.labelLines.map((line, lineIndex) => (
                  <text
                    key={`${value.id}-${line}`}
                    className="company-mission-wheel-label"
                    x={formatCoord(groupX)}
                    y={formatCoord(labelBaseY + lineIndex * LABEL_LINE_HEIGHT)}
                    textAnchor="middle"
                    fill={isActive || isHovered ? "#ffffff" : "rgba(255,255,255,.94)"}
                  >
                    {line}
                  </text>
                ))}
              </g>

              <g aria-hidden="true">
                <circle
                  className="company-mission-wheel-icon-ring"
                  cx={formatCoord(groupX)}
                  cy={formatCoord(iconCY)}
                  r={RICR}
                  fill={isActive ? "#ffffff" : isHovered ? "rgba(255,255,255,.24)" : "rgba(255,255,255,.18)"}
                  stroke={isActive ? value.activeColor : isHovered ? "rgba(255,255,255,.72)" : "rgba(255,255,255,.4)"}
                  strokeWidth="1.5"
                />
                <text
                  className="company-mission-wheel-icon"
                  x={formatCoord(groupX)}
                  y={formatCoord(iconCY)}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={isActive ? value.activeColor : "#ffffff"}
                >
                  {isActive ? "\u00d7" : "+"}
                </text>
              </g>
            </g>
          );
        })}
      </g>

      <circle
        cx={CX}
        cy={CY}
        r={RI}
        className={`company-mission-center-ring${activeIndex !== -1 ? " is-active" : ""}${hoveredIndex !== -1 ? " is-hovered" : ""}`}
        fill="#1a3320"
        stroke="#ffffff"
        strokeWidth="4"
      />

      {activeIndex === -1 ? (
        <g aria-hidden="true">
          <text
            className="company-mission-center-wordmark"
            x={CX}
            y={CY + 8}
            textAnchor="middle"
          >
            {centerLabel}
          </text>
        </g>
      ) : (
        <g aria-hidden="true">
          <text className="company-mission-center-description" x={CX} textAnchor="middle">
            {values[activeIndex].descriptionLines.map((line, index) => (
              <tspan
                key={`${values[activeIndex].id}-${line}`}
                x={CX}
                y={CY - ((values[activeIndex].descriptionLines.length - 1) * 16) / 2 + index * 16}
              >
                {line}
              </tspan>
            ))}
          </text>
        </g>
      )}
    </svg>
  );
};

export default CompanyMissionWheel;
