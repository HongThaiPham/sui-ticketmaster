
#[test_only]
module ticketmaster::ticketmaster_tests;
use sui::test_scenario;
use sui::test_utils::{assert_eq};
use std::string;
// uncomment this line to import the module
use ticketmaster::event::create_event;

const ENotImplemented: u64 = 0;

#[test]
fun test_ticketmaster() {
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

#[test, expected_failure(abort_code = ::ticketmaster::ticketmaster_tests::ENotImplemented)]
fun test_ticketmaster_fail() {
    abort ENotImplemented
}

