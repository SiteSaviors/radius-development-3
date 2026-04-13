import { useState } from "react";
import type { CompanyTeamMember } from "@/content/company";
import CompanyTeamDialog from "@/components/company/CompanyTeamDialog";

type CompanyTeamGridProps = {
  title: string;
  members: CompanyTeamMember[];
};

const CompanyTeamGrid = ({ title, members }: CompanyTeamGridProps) => {
  const [selectedMember, setSelectedMember] = useState<CompanyTeamMember | null>(null);

  const openMember = (member: CompanyTeamMember) => {
    setSelectedMember(member);
  };

  return (
    <>
      <div className="company-team-grid" aria-label={title}>
        {members.map((member) => (
          <article key={member.id} className="company-team-card">
            <div className="company-team-card-media-shell">
              <button
                type="button"
                className={`company-team-card-media${member.isPlaceholder ? " company-team-card-media--placeholder" : ""}`}
                onClick={() => openMember(member)}
                aria-label={`Open details for ${member.name}`}
              >
                {member.image ? (
                  <img className="company-team-card-image" src={member.image} alt={member.imageAlt} />
                ) : (
                  <div className="company-team-card-placeholder" role="img" aria-label={member.imageAlt} />
                )}
              </button>
            </div>

            <div className="company-team-card-meta">
              <div>
                <div className="company-team-card-name">{member.name}</div>
                <div className="company-team-card-role">{member.role}</div>
              </div>
              <button
                type="button"
                className="company-team-card-trigger"
                onClick={() => openMember(member)}
                aria-label={`Learn more about ${member.name}`}
              >
                +
              </button>
            </div>
          </article>
        ))}
      </div>

      <CompanyTeamDialog
        member={selectedMember}
        open={selectedMember !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedMember(null);
        }}
      />
    </>
  );
};

export default CompanyTeamGrid;
