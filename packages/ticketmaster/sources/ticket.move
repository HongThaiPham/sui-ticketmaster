
module ticketmaster::ticket;

use sui::package;
use sui::display;
use sui::tx_context::sender;
use sui::event;
use sui::url::{Self, Url};
use std::string::{utf8, String};
use sui::clock::Clock;


const ETicketAlreadyUsed: u64 = 0; // Error code for already used ticket


public struct TICKET has drop {}

public struct TicketNFT has key, store {
    id: UID,
    name: String,
    event_id: ID,
    image_url: Url,
    consumer: Option<address>, // Address of the consumer
    consumed_at: Option<u64>, // Timestamp when the ticket was consumed
}

// This event is emitted when a ticket is created.
public struct TicketCreated has copy, drop {
    object_id: ID,
    receiver: address,
    event_id: ID
}

// this event is emitted when a ticket is consumed.
public struct TicketConsumed has copy, drop {
    object_id: ID,
    consumer: address
}

// this event is emitted when a ticket is burned.
public struct TicketBurned has copy, drop {
    object_id: ID,
    burner: address
}



fun init(otw: TICKET, ctx: &mut TxContext) {
    // Config display
    let keys = vector[
        utf8(b"name"),
        utf8(b"link"),
        utf8(b"image_url"),
        utf8(b"event_id"),
        utf8(b"provider"),
        utf8(b"provider_url"),
    ];

    let values = vector[
        utf8(b"{name}"),
        utf8(b"https://ticketmaster.leopham.app/ticket/{id}"),
        utf8(b"{image_url}"),
        utf8(b"{event_id}"),
        utf8(b"Sui Ticketmaster"),
        utf8(b"https://ticketmaster.leopham.app"),
    ];

    // Claim the `Publisher` for the package!
    let publisher = package::claim(otw, ctx);

    let mut display = display::new_with_fields<TicketNFT>(
        &publisher,
        keys,
        values,
        ctx,
    );

    display::update_version(&mut display);

    transfer::public_transfer(publisher, sender(ctx));
    transfer::public_transfer(display, sender(ctx));
}
 
public(package) fun create(
    receiver: address,
    name: String,
    event_id: ID,
    ctx: &mut TxContext
): ID {
    let  id= object::new(ctx);

    let mut image_url = b"https://ticketmaster.leopham.app/ticket/image/,".to_string();    
    image_url.append(object::uid_to_address(&id).to_string());
    
    let new_ticket = TicketNFT {
        id,
        name,
        image_url: url::new_unsafe_from_bytes(
            *image_url.as_bytes(),
        ),
        event_id,
        consumer: option::none(),
        consumed_at: option::none(),
    };

    let id = object::id(&new_ticket);

    // Emit the TicketCreated event
    event::emit(TicketCreated {
        object_id: id,
        receiver,
        event_id,
    });

    // Transfer the ticket to the receiver
    transfer::public_transfer(new_ticket, receiver);
    id
}

public(package) fun consume(
    ticket: &mut TicketNFT,
    clock: &Clock,
    ctx: &TxContext
) {
    assert!(ticket.consumer.is_none(), ETicketAlreadyUsed);
    // Mark the ticket as used
    ticket.consumer = option::some(sender(ctx));
    ticket.consumed_at = option::some(sui::clock::timestamp_ms(clock));

    // Emit the TicketConsumed event
    event::emit(TicketConsumed {
        object_id: object::id(ticket),
        consumer: sender(ctx),
    });
}

// get event id from ticket
public fun get_event_id(ticket: &TicketNFT): ID {
    ticket.event_id
}

public fun burn(ticket: TicketNFT, ctx: &mut TxContext) {
    // Burn the ticket by deleting its object
    let TicketNFT {
        id, name:_, event_id:_, image_url:_, consumer: _, consumed_at: _
    } = ticket;

    // Emit the TicketBurned event
    event::emit(TicketBurned {
        object_id: id.to_inner(),
        burner: sender(ctx),
    });

    object::delete(id);
}