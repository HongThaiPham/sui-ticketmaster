module ticketmaster::ticketmaster;
use std::string;
use ticketmaster::event::Event;


public fun create_event<T>(
    creator: address,
    name: string::String,
    time: u64,
    location: string::String,
    tickets_available: u64,
    price_per_ticket: u64,
    ctx: &mut TxContext
) {
    ticketmaster::event::create<T>(
        creator,
        name,
        time,
        location,
        tickets_available,
        price_per_ticket,
        ctx
    );
}



public fun buy_a_ticket<T>(
    event: &mut Event<T>,
    coin: &mut sui::coin::Coin<T>,
    ctx: &mut TxContext
) {
    ticketmaster::event::buy_ticket(event, coin, ctx);
}

public fun consume_a_ticket<T>(
    event: &Event<T>,
    ticket: &mut ticketmaster::ticket::TicketNFT,
    clock: &sui::clock::Clock,
    ctx: &TxContext
) {
    ticketmaster::event::consume_ticket(event, ticket, clock, ctx);
}

public fun burn_a_ticket(
    ticket: ticketmaster::ticket::TicketNFT,
    ctx: &mut TxContext
) {
    ticketmaster::ticket::burn(ticket, ctx);
}