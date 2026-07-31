# Content migration — Milestone B

Inventory of how legacy homepage content maps onto the knowledge graph.
Statuses: **CONFIRMED** · **DRAFTED** · **NEEDS REVIEW** · **UNRESOLVED LEGACY TAG**

## CONFIRMED

| Record | Notes |
| --- | --- |
| Domains from `capabilities.ts` | All seven capability ids registered as domain terms |
| `industry-engagement` | Added as domain (was orphan `domainId` on Etihad Rail) |
| `electronics-embedded-systems` | Added for ASIC / PCB work |
| Kinesis / Photonics / HTS | First-class laboratory hubs (`InfrastructureRecord`; public routes under `/laboratories`) |
| RGB-T UAV → `tested-in` → Kinesis | Explicit in project narrative |
| UAV Visual Tracking & Localization | One work record (`rgb-t-uav-detection-tracking`); RGB-T is the flagship arena demo inside a six-paper 2020–2022 thread (PTZ, relative localization, RGB-T, evader, spherical, Siamese) — Photonics-style multi-evidence, not a single-paper project |
| PalmSpector → Clearpath Husky + SLAM | Explicit in highlights |
| Eye-gaze wheelchair → assistive-technology + publication | IEEE Access evidence |
| Photonics acknowledgements | Six research-output evidence links |
| Lab inventory vs project platforms | Spot/KUKA/Vicon on Kinesis inventory only |

## DRAFTED

| Record | Drafted fields | Review focus |
| --- | --- | --- |
| All projects | `contributionSummary`, contribution facets | Verb precision vs actual role |
| Etihad Rail | domain, application, outcomes, Instagram evidence | Confirm leadership vs facilitation |
| Multi-agent construction | methods, JFR publication | Exact authorship role |
| Airport inspection drone | `supported` contribution | Confirm personal scope |
| Android telepresence | electronics-design / supported | Confirm vs lab technician narrative |
| Industrial teleoperation | platforms include vicon-motion-capture | Confirm mocap system brand |
| ASIC validation | domains include electronics + lab-automation | Confirm primary domain |
| UAV–UGV hybrid | no application facet (platforms + method only) | Optional application tag |

## NEEDS REVIEW

| Record | Field | Issue |
| --- | --- | --- |
| `multiagent-construction-exploration` | `status: needs-review` | Contribution verbs drafted from publication, not personal statement |
| `hardware-security-asic-validation-platform` | `status: needs-review` | Fabrication facility not linked (CTP equipment mentioned generically — no Electronics Workshop entity yet) |
| `nyuad-adac-airport-inspection-drone` | `status: needs-review` | Contribution level (`supported`) estimated from institutional video |
| Kinesis inventory | `boston-dynamics-spot` | Present in fleet photography; confirm operated vs hosted |
| Photonics | no inventory platforms | Optical instruments not yet in platform taxonomy |

## UNRESOLVED LEGACY TAG

See `src/content/legacy-tag-map.ts` → `unresolvedLegacyTags`.

Broad or ambiguous tags intentionally left unmapped:

- `AI & robotics`, `3D digitization`, `Obstacle avoidance`, `Logic locking`
- `UAV robotic arms`, `Industry collaboration` (as free tag), `Field robotics`
- `Aerial mapping`, `Servo actuation`, `Electromechanical design`, `Humanoid robotics`

Do **not** silently promote these into facets. Resolve in editorial review, then add to `legacyTagMap`.

## Entity slug map

| Legacy id | Graph slug | Type |
| --- | --- | --- |
| `kinesis-ctp-laboratory` | same | infrastructure |
| `photonics-ctp-laboratory` | same | infrastructure |
| `nyuad-hts-platform` | same | infrastructure |
| All project ids | same | project |

## Evidence model notes

- Peer-reviewed papers with structured metadata → `ResearchOutputRecord` + `EvidenceRef.target`
- Instagram / YouTube / local video → `EvidenceRef` without entity page
- Photographs on PalmSpector / labs → `photograph` evidence (media still on record)
- `evidencePending` unused so far — every published project has at least one evidence item
