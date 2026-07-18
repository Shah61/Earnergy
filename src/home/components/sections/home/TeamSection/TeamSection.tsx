import type { CSSProperties } from "react";
import { ArrowRightIcon } from "@home/components/ui/icons";
import { MemberPhotoPlaceholder } from "@home/components/ui/MemberPhotoPlaceholder";
import { TEAM_MEMBERS } from "@home/constants/team";

const reveal = (delay: string): CSSProperties => ({ "--d": delay } as CSSProperties);

export function TeamSection() {
  return (
    <section className="team" aria-labelledby="team-tag">
      <div className="wrap team-inner">
        <div className="team-head">
          <p className="tag r2" id="team-tag" style={reveal(".05s")}>
            <span>Our Team</span>
          </p>
          <h2 className="headline">
            <span className="l1 r2" style={reveal(".1s")}>
              Meet The People Behind Our
            </span>
            <span className="l2 r2" style={reveal(".3s")}>
              Success Experienced
            </span>
          </h2>
        </div>

        <div className="team-grid">
          <div className="team-intro r2" style={reveal(".05s")}>
            <h3 className="team-join">
              <span className="ink">
                Join a Team That Delivers Innovation and
              </span>{" "}
              <span className="dim">Moves the World Forward</span>
            </h3>
            <p className="team-join-text">
              Be part of a team that moves industries forward — we value
              dedication, innovation, and the drive to make an impact.
            </p>
            <button type="button" className="cta">
              Join Now
              <ArrowRightIcon />
            </button>
          </div>

          {TEAM_MEMBERS.map((member) => (
            <figure
              key={member.name}
              className="member r2"
              style={reveal(member.revealDelay)}
            >
              <div className="member-photo">
                {member.image ? (
                  <img src={member.image} alt={member.name} loading="lazy" decoding="async" />
                ) : (
                  <MemberPhotoPlaceholder />
                )}
              </div>
              <figcaption>
                <h4>{member.name}</h4>
                <p>{member.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
