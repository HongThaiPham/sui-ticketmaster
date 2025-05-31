
#[test_only]
module ticketmaster::ticketmaster_tests;
use sui::test_scenario;
use sui::test_utils::{assert_eq};
use std::string;
use ticketmaster::event::{create_event, get_event_balance};
use ticketmaster::event::Event;
use ticketmaster::event::buy_ticket;
use sui::coin::{Self, Coin};
use ticketmaster::ticket::TicketNFT;


#[test]
fun test_create_event() {
    let alice = @0xA;
    let bob = @0xB;

    let mut scenario = test_scenario::begin(alice);
    {
        create_event<0x2::sui::SUI>(
            alice,
            string::utf8(b"Concert"),
            scenario.ctx().epoch_timestamp_ms() + 1, // Example timestamp
            string::utf8(b"Stadium"),
            100,
            10, // Price per ticket
            test_scenario::ctx(&mut scenario)
        );
    };

    test_scenario::next_tx(&mut scenario, bob);
    {
        let received_object = test_scenario::take_shared(&scenario);
        let event_name = ticketmaster::event::get_event_name<0x2::sui::SUI>(&received_object);
        assert_eq(event_name, string::utf8(b"Concert")); // Name
        test_scenario::return_shared(received_object);
    };

  
    test_scenario::end(scenario);
}

#[test]
fun test_buy_ticket() {
    let alice = @0xA;
    let bob = @0xB;
    

    let mut scenario = test_scenario::begin(alice);
    {
        create_event<0x2::sui::SUI>(
            alice,
            string::utf8(b"Concert"),
            scenario.ctx().epoch_timestamp_ms() + 1, // Example timestamp
            string::utf8(b"Stadium"),
            100,
            10, // Price per ticket
            test_scenario::ctx(&mut scenario)
        );

    };
    
    test_scenario::next_tx(&mut scenario, bob);
    {
        let coin = coin::mint_for_testing<0x2::sui::SUI>(1000, scenario.ctx());

        transfer::public_transfer(coin, bob);
        
    };

    test_scenario::next_tx(&mut scenario, bob);
    {
        let mut event_object = test_scenario::take_shared<Event<0x2::sui::SUI>>(&scenario);

        let mut sui_coin = test_scenario::take_from_sender<Coin<0x2::sui::SUI>>(&scenario);

        // let  coin_to_pay = coin::split(&mut sui_coin, 10, scenario.ctx()); // Split the coin to pay for the ticket

        buy_ticket(&mut event_object, &mut sui_coin, test_scenario::ctx(&mut scenario));
       
        scenario.return_to_sender(sui_coin);
        test_scenario::return_shared(event_object);
    };

    // check if the ticket was bought successfully
    test_scenario::next_tx(&mut scenario, alice);
    {
        let ticket_object = test_scenario::take_from_address<TicketNFT>(&scenario, bob);
        
        test_scenario::return_to_address(bob, ticket_object);
    };

    // check balance of the event
    test_scenario::next_tx(&mut scenario, alice);
    {
        let event_object = test_scenario::take_shared<Event<0x2::sui::SUI>>(&scenario);
        let balance = get_event_balance<0x2::sui::SUI>(&event_object);
        assert_eq(balance, 10); // Balance should be equal to the price of the ticket
        test_scenario::return_shared(event_object);
    };

    // check balance of bob
    test_scenario::next_tx(&mut scenario, bob);
    {
        let bob_coin = test_scenario::take_from_sender<Coin<0x2::sui::SUI>>(&scenario);
        assert_eq(990, coin::value(&bob_coin)); // Bob should have 990 SUI left after buying the ticket
        scenario.return_to_sender(bob_coin);
    };

    test_scenario::end(scenario);
}


#[test, expected_failure(abort_code = ::ticketmaster::event::EInfufficientFunds)]
fun test_buy_ticket_fail_EInfufficientFunds() {
    let alice = @0xA;
    let bob = @0xB;
    

    let mut scenario = test_scenario::begin(alice);
    {
        create_event<0x2::sui::SUI>(
            alice,
            string::utf8(b"Concert"),
            scenario.ctx().epoch_timestamp_ms() + 1, // Example timestamp
            string::utf8(b"Stadium"),
            100,
            10, // Price per ticket
            test_scenario::ctx(&mut scenario)
        );

    };
    test_scenario::next_tx(&mut scenario, bob);
    {
        let coin = coin::mint_for_testing<0x2::sui::SUI>(1, scenario.ctx());

        transfer::public_transfer(coin, bob);
        
    };

    test_scenario::next_tx(&mut scenario, bob);
    {
        let mut event_object = test_scenario::take_shared<Event<0x2::sui::SUI>>(&scenario);

        let mut sui_coin = test_scenario::take_from_sender<Coin<0x2::sui::SUI>>(&scenario);

        buy_ticket(&mut event_object, &mut sui_coin, test_scenario::ctx(&mut scenario));
       
        scenario.return_to_sender(sui_coin);
        test_scenario::return_shared(event_object);
    };


    test_scenario::end(scenario);
}

#[test, expected_failure(abort_code = ::ticketmaster::event::EOutOfStock)]
fun test_buy_ticket_fail_EOutOfStock() {
    let alice = @0xA;
    let bob = @0xB;
    

    let mut scenario = test_scenario::begin(alice);
    {
        create_event<0x2::sui::SUI>(
            alice,
            string::utf8(b"Concert"),
            scenario.ctx().epoch_timestamp_ms() + 1, // Example timestamp
            string::utf8(b"Stadium"),
            0,
            10, // Price per ticket
            test_scenario::ctx(&mut scenario)
        );

    };
    test_scenario::next_tx(&mut scenario, bob);
    {
        let coin = coin::mint_for_testing<0x2::sui::SUI>(1, scenario.ctx());

        transfer::public_transfer(coin, bob);
        
    };

    test_scenario::next_tx(&mut scenario, bob);
    {
        let mut event_object = test_scenario::take_shared<Event<0x2::sui::SUI>>(&scenario);

        let mut sui_coin = test_scenario::take_from_sender<Coin<0x2::sui::SUI>>(&scenario);

        buy_ticket(&mut event_object, &mut sui_coin, test_scenario::ctx(&mut scenario));
       
        scenario.return_to_sender(sui_coin);
        test_scenario::return_shared(event_object);
    };


    test_scenario::end(scenario);
}

#[test, expected_failure(abort_code = ::ticketmaster::event::EInvalidPrice)]
fun test_create_event_fail() {
    let alice = @0xA;

    let mut scenario = test_scenario::begin(alice);
    {
        create_event<0x2::sui::SUI>(
            alice,
            string::utf8(b"Concert"),
            scenario.ctx().epoch_timestamp_ms() + 1, // Example timestamp
            string::utf8(b"Stadium"),
            100,
            0, // Price per ticket
            test_scenario::ctx(&mut scenario)
        );
    };
 
    test_scenario::end(scenario);
}

