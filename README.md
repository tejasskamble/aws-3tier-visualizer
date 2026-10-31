# aws-3tier-visualizer

An interactive, animated website that teaches AWS three-tier web architecture to beginners. Ravi owns an online business inside a secure AWS campus; nine steps reveal the architecture piece by piece on one SVG diagram. Plain HTML, CSS, vanilla JS and inline SVG: no frameworks, no build step.

## Features
Nine progressive steps, auto-play/pause/reset, progress counter, moving-object legend, Beginner/Technical mode, light/dark page theme (diagram stays navy), full traffic-flow animation, AZ 1a failure simulation, architecture summary, searchable glossary, reduced-motion support and keyboard focus outlines.

## Architecture
One VPC (10.0.0.0/16) across two Availability Zones.

| | AZ 1a | AZ 1b |
|---|---|---|
| Public web subnet | 10.0.1.0/24 | 10.0.4.0/24 |
| Private app subnet | 10.0.2.0/24 | 10.0.5.0/24 |
| Private DB subnet | 10.0.3.0/24 | 10.0.6.0/24 |

Shared: Internet Gateway, External ALB, Internal ALB, Web and App Auto Scaling Groups, RDS Writer (1a) and Reader (1b), DB Subnet Group, S3, IAM Role, NAT Gateway per AZ, route tables, Security Groups and Network ACLs.

## The nine steps
1 Region & VPC · 2 Availability Zones · 3 Subnets · 4 Internet connectivity · 5 Web tier · 6 Application & database tiers · 7 NAT Gateway · 8 Security · 9 VPN & VPC peering.

## Services and analogies
Region = city, VPC = fenced campus, AZ = building, Subnet = department, Internet Gateway = main entrance, Route Table = direction board, Load Balancer = receptionist, Web Server = front desk, App Server = back office, Database = records room, NAT = delivery counter, Security Group = door guard, NACL = floor checkpoint, IAM Role = permission card, S3 = warehouse, VPN = secret tunnel, Peering = private road, Auto Scaling = hiring staff.

## Traffic flow
Internet → IGW → External ALB → Web Server → Internal ALB → App Server → RDS → response. Private servers reach the internet only through NAT.

## Writer and Reader
The Writer accepts reads and writes and replicates to the Reader, which serves read traffic. A read replica is **not** a Multi-AZ standby: a standard RDS replica needs manual promotion; Aurora can promote a reader automatically.

## Security and high availability
App and DB tiers sit in private subnets. Security Groups (stateful, per instance) and NACLs (stateless, per subnet) are layered. If AZ 1a fails, health checks steer both ALBs to AZ 1b. Not every component fails over automatically; the simulation says so.

## Structure
```
index.html  css/style.css  js/{app,architecture,animations,steps}.js  assets/favicon.svg  .nojekyll  LICENSE
```

## Run locally
`python3 -m http.server 8000` then open `http://localhost:8000`.

## GitHub Pages
Settings → Pages → Deploy from a branch → main → / (root) → Save.

## Customise
Edit step text and glossary in `js/steps.js`; nodes, CIDRs, wires and packet paths in `js/architecture.js` (`P` = paths, `W` = wires, `PK` = packets); traffic-flow timing in `js/animations.js`; colours in `css/style.css`.

## License
MIT
