# Sui Ticketmaster – Decentralized Ticketing System

## Overview

**Sui Ticketmaster** is a decentralized ticketing platform built on the [Sui blockchain](https://sui.io/), inspired by Ticketmaster. It leverages blockchain technology to provide transparent, secure, and fair ticket distribution, resale, and validation for events. Each ticket is represented as an NFT (Non-Fungible Token), ensuring authenticity and preventing fraud or double-selling.

---

## Features

- **Event Creation:** Event organizers can create and manage events on-chain.
- **NFT Ticket Minting:** Tickets are minted as NFTs, uniquely representing each seat or entry.
- **Primary Sales:** Users can purchase tickets directly from event organizers.
- **Secondary Market:** Safe peer-to-peer ticket resale with optional royalty enforcement.
- **On-Chain Ownership:** All ticket transfers and ownership are transparent and verifiable.
- **Ticket Validation:** Tickets can be marked as used upon entry, preventing reuse.
- **Fraud Prevention:** Blockchain provenance eliminates counterfeiting and double-spending.
- **Scalable & User-Friendly:** Optimized for a smooth user experience, abstracting blockchain complexity where possible.

---

## Folder Structure

```
apps/
  web/                 # dApp

packages/
  ui/                  # Shared UI components
  ticketmaster/        # Move smart contract for ticketing logic
```

- **apps/web**: The frontend decentralized application (dApp) using Next.js, Tailwind CSS, shadcnui for UI, and Prisma for data modeling.
- **packages/ui**: A collection of reusable UI components shared across the project.
- **packages/ticketmaster**: The Move contract source code that implements the ticketing logic on the Sui blockchain.

---

## Tech stack

### Frontend

- Next.js
- Tailwindcss
- ShadcnUI

### Backend

- Next.js server actions
- Prisma
- Postgress

---

## Architecture

### (Sui / Move Smart Contracts)

- **Event Object:** Contains event details (organizer, name, date, location, ticket supply).
- **Ticket NFT:** Each ticket is a unique Move object, with seat/info, owner, and status.
- **Modules:**
  - Event creation and management
  - Ticket minting, transferring, validation (mark as used)
  - Secondary market logic (resale, royalties)

---

## Quick Start

1. **Clone the repository**

   ```sh
   git clone https://github.com/your-org/sui-ticketmaster.git
   cd sui-ticketmaster
   ```

2. **Deploy Move Smart Contracts**

   - Install [Sui CLI](https://docs.sui.io/getting-started/installation).
   - Build and deploy the Move modules in `/sources/`:

     ```sh
     sui move build
     sui client publish --gas-budget 100000000
     ```

---

## Roadmap

- [ ] Core: Event creation, ticket minting, transfer, and validation
- [ ] Secondary market: Resale with royalty enforcement
- [ ] On-chain analytics
- [ ] Fiat onramps and off-chain notifications
- [ ] Mobile support and ticket scanning
- [ ] User experience enhancements

---

## Security & Anti-Fraud

- All tickets are NFTs, preventing double-selling and counterfeiting.
- Ownership and transfer history are fully transparent on-chain.
- Tickets are marked as used after entry to prevent reuse.
- No personal data is stored on-chain.

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -am 'Add feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request

---

## License

MIT

---

## Resources

- [Sui Documentation](https://docs.sui.io/)
- [Move Language Book](https://move-language.github.io/move/)
- [NFTs on Sui](https://docs.sui.io/learn/nfts/overview)

---
