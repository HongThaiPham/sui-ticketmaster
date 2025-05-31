module ticketmaster::ticketmaster;
use std::string;



public fun create_event<T>(
    creator: address,
    name: string::String,
    time: u64,
    location: string::String,
    tickets_available: u64,
    price_per_ticket: u64,
    ctx: &mut TxContext
) {
    ticketmaster::event::create_event<T>(
        creator,
        name,
        time,
        location,
        tickets_available,
        price_per_ticket,
        ctx
    );
}


