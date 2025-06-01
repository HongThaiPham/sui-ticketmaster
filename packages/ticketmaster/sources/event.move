module ticketmaster::event; 

use std::string;
use sui::balance::{Self,Balance};
use sui::coin::{Self, Coin};
use ticketmaster::ticket::{Self, TicketNFT};
use sui::tx_context::sender;
use sui::clock::Clock;

const EInvalidPrice: u64 = 0;
const EOutOfStock: u64 = 1;
const EInfufficientFunds: u64 = 2;
const ETicketNotMatch: u64 = 3;
const EEventNotStarted: u64 = 4;

public struct Event<phantom T> has key {
    id: UID,
    creator: address, // Address of the creator
    balance: Balance<T>, // Tracking the balance of coins for the event
    name: string::String, // Name of the event
    time: u64, // Unix timestamp
    location: string::String, // Location of the event
    tickets_available: u64, // Number of tickets available
    tickets_sold: u64, // Number of tickets sold
    price_per_ticket: u64, // Price per ticket in coins
}

// Function to create a new event
public(package) entry fun create<T>(
    name: string::String,
    time: u64,
    location: string::String,
    tickets_available: u64,
    price_per_ticket: u64,
    ctx: &mut TxContext
) {
    assert!(price_per_ticket > 0, EInvalidPrice);
    let event = Event {
        id: object::new(ctx),
        creator: sender(ctx),
        balance: balance::zero<T>(),
        name,
        time,
        location,
        tickets_available,
        tickets_sold: 0,
        price_per_ticket,
    };

    transfer::share_object(event);
}

// Function to buy a ticket for an event
public(package) fun buy_ticket<T>(
    event: &mut Event<T>,
    coin: &mut Coin<T>,
    ctx: &mut TxContext
) {
    assert!(event.tickets_available > 0, EOutOfStock);
    
    let total_price = event.price_per_ticket;
    assert!(coin.value() >= total_price, EInfufficientFunds);

    let coin_to_transfer = coin::split<T>(coin, total_price, ctx);

    coin::put<T>(&mut event.balance, coin_to_transfer);
 
    event.tickets_available = event.tickets_available - 1;
    event.tickets_sold = event.tickets_sold + 1;

    let event_id = object::id(event);

    ticket::create(sender(ctx), event.name, event_id, ctx);
}


// Function to cosume a ticket
public(package) fun consume_ticket<T>(
    event: &Event<T>,
    ticket: &mut TicketNFT,
    clock: &Clock,
    ctx: &TxContext
) {
    // check ticket match with event
    assert!(&event.id.to_inner() == ticket::get_event_id(ticket), ETicketNotMatch);

    // check if the event is ongoing
    assert!(sui::clock::timestamp_ms(clock) >= event.time, EEventNotStarted);
    ticket::consume(ticket, clock, ctx);
}


#[test_only]
public fun get_event_creator<T>(event: &Event<T>): address {
    event.creator
}

public fun get_event_balance<T>(event: &Event<T>): u64 {
    event.balance.value()
}

#[test_only]
public fun get_event_name<T>(event: &Event<T>): string::String {
    event.name
}

#[test_only]    
public fun get_event_tickets_available<T>(event: &Event<T>): u64 {
    event.tickets_available
}
#[test_only]
public fun get_event_tickets_sold<T>(event: &Event<T>): u64 {
    event.tickets_sold
} 
