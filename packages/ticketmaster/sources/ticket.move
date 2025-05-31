
module ticketmaster::ticket;

use sui::package;
use sui::display;
use sui::tx_context::sender;
use sui::event;
use sui::url::{Self, Url};
use std::string::{utf8, String};


public struct TICKET has drop {}

public struct TicketNFT has key, store {
    id: UID,
    name: String,
    event_id: ID,
    image_url: Url,
}

// This event is emitted when a ticket is created.
public struct TicketCreated has copy, drop {
    object_id: ID,
    receiver: address,
    event_id: ID
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
 
public(package) fun create_ticket(
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