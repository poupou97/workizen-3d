"use client";

import { citizens, districts, getCitizen, getDistrict, getNpc, getOpportunity, opportunities } from "./data";
import { useCampusStore } from "./store";
import type { CitizenManifest, Opportunity, RecommendedTeamMember } from "./types";

export function SelectionPanel() {
  const selected = useCampusStore((state) => state.selected);
  const select = useCampusStore((state) => state.select);

  return (
    <aside className="glass-panel scroll-thin absolute left-4 top-[150px] z-20 max-h-[calc(100vh-15rem)] w-[min(340px,calc(100vw-2rem))] overflow-y-auto rounded-lg p-4 md:top-[136px]">
      {selected.kind === "vision" ? <VisionPanel /> : null}
      {selected.kind === "district" ? <DistrictPanel id={selected.id} /> : null}
      {selected.kind === "npc" ? <NpcPanel id={selected.id} /> : null}
      {selected.kind === "citizen" ? <CitizenPanel id={selected.id} /> : null}
      {selected.kind === "opportunity" ? <OpportunityPanel id={selected.id} /> : null}
      {selected.kind === "team" ? <TeamPanel id={selected.id} /> : null}
      <div className="mt-4 border-t border-sky-100 pt-3">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Quick Open</p>
        <div className="mt-3 grid grid-cols-1 gap-2">
          {opportunities.map((opportunity) => (
            <button
              key={opportunity.id}
              type="button"
              className="rounded-md border border-orange-100 bg-white px-3 py-2 text-left text-xs font-bold text-slate-800 transition hover:border-orange-200 hover:bg-orange-50"
              onClick={() => select({ kind: "opportunity", id: opportunity.id })}
            >
              {opportunity.name}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

function VisionPanel() {
  return (
    <section>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">Founder Demo</p>
      <h2 className="mt-2 text-2xl font-black leading-tight text-slate-950">Workizen HQ Island</h2>
      <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">
        A starter island where Digital Citizens discover districts, opportunities, and teams.
      </p>
      <div className="mt-3 grid gap-2 text-xs font-bold text-slate-800">
        <Badge label="World" value="HQ Island" />
        <Badge label="Spawn" value="Citizen Plaza" />
        <Badge label="Main Landmark" value="AI Agent Lab" />
      </div>
    </section>
  );
}

function DistrictPanel({ id }: { id: string }) {
  const district = getDistrict(id);
  const select = useCampusStore((state) => state.select);

  if (!district) {
    return null;
  }

  const activeCitizens = district.activeCitizenIds.map(getCitizen).filter(Boolean) as CitizenManifest[];
  const districtOpportunities = district.opportunityIds.map(getOpportunity).filter(Boolean) as Opportunity[];

  return (
    <section>
      <p className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: district.accentColor }}>
        District
      </p>
      <h2 className="mt-2 text-2xl font-black leading-tight text-slate-950">{district.name}</h2>
      <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">{district.description}</p>
      <PanelBlock title="Purpose">
        <p>{district.purpose}</p>
      </PanelBlock>
      <PanelBlock title="Active Citizens">
        {activeCitizens.length ? (
          <div className="flex flex-wrap gap-2">
            {activeCitizens.map((citizen) => (
              <button
                key={citizen.citizen_id}
                type="button"
                className="rounded-md bg-sky-50 px-2.5 py-1.5 text-xs font-bold text-slate-800 hover:bg-cyan-50"
                onClick={() => select({ kind: "citizen", id: citizen.citizen_id })}
              >
                {citizen.name}
              </button>
            ))}
          </div>
        ) : (
          <p>No active mock citizens yet.</p>
        )}
      </PanelBlock>
      <PanelBlock title="Open Opportunities">
        {districtOpportunities.length ? (
          <div className="grid gap-2">
            {districtOpportunities.map((opportunity) => (
              <button
                key={opportunity.id}
                type="button"
                className="rounded-md border border-rose-100 bg-rose-50 px-3 py-2 text-left text-xs font-bold text-rose-900 hover:bg-rose-100"
                onClick={() => select({ kind: "opportunity", id: opportunity.id })}
              >
                {opportunity.name}
              </button>
            ))}
          </div>
        ) : (
          <p>No open opportunities in this district.</p>
        )}
      </PanelBlock>
    </section>
  );
}

function NpcPanel({ id }: { id: string }) {
  const npc = getNpc(id);
  const district = npc ? getDistrict(npc.districtId) : undefined;

  if (!npc) {
    return null;
  }

  return (
    <section>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">NPC Host</p>
      <h2 className="mt-2 text-2xl font-black leading-tight text-slate-950">{npc.name}</h2>
      <p className="mt-1 text-sm font-black" style={{ color: npc.accentColor }}>
        {npc.role}
      </p>
      <p className="mt-3 text-sm font-semibold leading-6 text-slate-700">{npc.purpose}</p>
      <PanelBlock title="District">
        <p>{district?.name ?? "Workizen HQ Campus"}</p>
      </PanelBlock>
      <PanelBlock title="Allowed Actions">
        <TagList values={npc.allowedActions} />
      </PanelBlock>
    </section>
  );
}

function CitizenPanel({ id }: { id: string }) {
  const citizen = getCitizen(id);

  if (!citizen) {
    return null;
  }

  return (
    <section>
      <p className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: citizen.accentColor }}>
        {citizen.citizen_type}
      </p>
      <h2 className="mt-2 text-2xl font-black leading-tight text-slate-950">{citizen.name}</h2>
      <p className="mt-1 text-sm font-black text-slate-700">{citizen.role}</p>
      <p className="mt-3 text-sm font-semibold leading-6 text-slate-700">{citizen.description}</p>
      <PanelBlock title="Manifest">
        <Badge label="Availability" value={citizen.availability} />
        <Badge label="Location" value={citizen.location.district} />
        <Badge label="Status" value={citizen.current_status} />
        <Badge label="Avatar" value={citizen.avatar_type} />
      </PanelBlock>
      <PanelBlock title="Skills">
        <TagList values={citizen.skills} />
      </PanelBlock>
      <PanelBlock title="Reputation Placeholder">
        <p className="font-black text-slate-950">
          {citizen.reputation.score} · {citizen.reputation.level}
        </p>
        <p className="mt-1">{citizen.reputation.summary}</p>
      </PanelBlock>
      <PanelBlock title="Allowed Actions">
        <TagList values={citizen.allowed_actions} />
      </PanelBlock>
    </section>
  );
}

function OpportunityPanel({ id }: { id: string }) {
  const opportunity = getOpportunity(id);
  const select = useCampusStore((state) => state.select);

  if (!opportunity) {
    return null;
  }

  return (
    <section>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-rose-600">Opportunity</p>
      <h2 className="mt-2 text-2xl font-black leading-tight text-slate-950">{opportunity.name}</h2>
      <p className="mt-3 text-sm font-semibold leading-6 text-slate-700">{opportunity.description}</p>
      <PanelBlock title="Purpose">
        <p>{opportunity.purpose}</p>
      </PanelBlock>
      <PanelBlock title="Status">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-md bg-rose-100 px-2.5 py-1.5 text-xs font-black uppercase text-rose-700">
            {opportunity.status}
          </span>
          <span className="rounded-md bg-slate-100 px-2.5 py-1.5 text-xs font-black uppercase text-slate-700">
            {opportunity.difficulty}
          </span>
        </div>
      </PanelBlock>
      <button
        type="button"
        className="mt-4 w-full rounded-md bg-blue-600 px-4 py-3 text-sm font-black text-white shadow-sm shadow-blue-200 transition hover:bg-blue-700"
        onClick={() => select({ kind: "team", id: opportunity.id })}
      >
        View Recommended Team
      </button>
    </section>
  );
}

function TeamPanel({ id }: { id: string }) {
  const opportunity = getOpportunity(id);

  if (!opportunity) {
    return null;
  }

  return (
    <section>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-600">Recommended Team</p>
      <h2 className="mt-2 text-2xl font-black leading-tight text-slate-950">{opportunity.name}</h2>
      <p className="mt-3 text-sm font-semibold leading-6 text-slate-700">
        A mock team composition showing how Workizen turns an opportunity into a delivery group.
      </p>
      <div className="mt-4 grid gap-3">
        {opportunity.recommendedTeam.map((member) => (
          <TeamMemberRow key={`${member.role}-${member.name}`} member={member} />
        ))}
      </div>
    </section>
  );
}

function TeamMemberRow({ member }: { member: RecommendedTeamMember }) {
  return (
    <div className="rounded-lg border border-sky-100 bg-white p-3">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">{member.role}</p>
      <p className="mt-1 text-sm font-black text-slate-950">{member.name}</p>
      <p className="text-xs font-bold text-slate-600">{member.citizenType}</p>
    </div>
  );
}

function PanelBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-4 rounded-lg border border-sky-100 bg-white/85 p-3 text-sm font-semibold leading-6 text-slate-700">
      <p className="mb-2 text-xs font-black uppercase tracking-[0.16em] text-slate-500">{title}</p>
      {children}
    </div>
  );
}

function Badge({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2 rounded-md bg-sky-50 px-2.5 py-1.5 text-xs">
      <span className="font-black uppercase text-slate-500">{label}</span>
      <span className="font-bold text-slate-900">{value}</span>
    </div>
  );
}

function TagList({ values }: { values: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {values.map((value) => (
        <span key={value} className="rounded-md bg-sky-50 px-2.5 py-1.5 text-xs font-bold text-slate-800">
          {value.replaceAll("_", " ")}
        </span>
      ))}
    </div>
  );
}
