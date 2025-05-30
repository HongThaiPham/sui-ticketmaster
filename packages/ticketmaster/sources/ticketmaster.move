module ticketmaster::event {
    use std::string;
    use sui::balance::{Self,Balance};
    use sui::coin::Coin;

    public struct Event<phantom T> has key {
        id: UID,
        creator: address, // Address of the creator
        balance: Balance<Coin<T>>, // Tracking the balance of coins for the event
        name: string::String, // Name of the event
        time: u64, // Unix timestamp
        location: string::String, // Location of the event
        tickets_available: u64, // Number of tickets available
        tickets_sold: u64, // Number of tickets sold
    }

    public entry fun create_event<T>(
        creator: address,
        name: string::String,
        time: u64,
        location: string::String,
        tickets_available: u64,
        ctx: &mut TxContext
    ) {
        let event = Event {
            id: object::new(ctx),
            creator,
            balance: balance::zero<Coin<T>>(),
            name,
            time,
            location,
            tickets_available,
            tickets_sold: 0,
        };

        transfer::share_object(event);
    }


    #[test_only]
    public fun get_event_creator<T>(event: &Event<T>): address {
        event.creator
    }

    #[test_only]
    public fun get_event_balance<T>(event: &Event<T>): u64 {
        event.balance.value()
    }

    #[test_only]
    public fun get_event_name<T>(event: &Event<T>): string::String {
        event.name
    }
    #[test_only]
    public fun get_event_time<T>(event: &Event<T>): u64 {
        event.time
    }
    #[test_only]
    public fun get_event_location<T>(event: &Event<T>): string::String {
        event.location
    }
    #[test_only]    
    public fun get_event_tickets_available<T>(event: &Event<T>): u64 {
        event.tickets_available
    }
    #[test_only]
    public fun get_event_tickets_sold<T>(event: &Event<T>): u64 {
        event.tickets_sold
    } 
}