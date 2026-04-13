import type { CompanyTeamMember } from "@/content/company";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

type CompanyTeamDialogProps = {
  member: CompanyTeamMember | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const CompanyTeamDialog = ({ member, open, onOpenChange }: CompanyTeamDialogProps) => (
  <Dialog open={open && !!member} onOpenChange={onOpenChange}>
    {member ? (
      <DialogContent className="company-team-dialog">
        <div className={`company-team-dialog-media${member.isPlaceholder ? " company-team-dialog-media--placeholder" : ""}`}>
          {member.image ? (
            <img className="company-team-dialog-image" src={member.image} alt={member.imageAlt} />
          ) : (
            <div
              className="company-team-dialog-placeholder"
              role="img"
              aria-label={member.imageAlt}
            />
          )}
        </div>

        <div className="company-team-dialog-copy">
          <DialogTitle className="company-team-dialog-name">{member.name}</DialogTitle>
          <DialogDescription className="company-team-dialog-role">{member.role}</DialogDescription>
          <div className="company-team-dialog-body">
            <p>{member.bio}</p>
          </div>
        </div>
      </DialogContent>
    ) : null}
  </Dialog>
);

export default CompanyTeamDialog;
