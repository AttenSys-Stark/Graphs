mod pb;
mod abi;

use pb::starknet::v1::*;
use crate::abi::orgsubgraph_contract::Event as OrgsubgraphEvent;
use crate::abi::eventsubgraph_contract::Event as EventsubgraphEvent;
use crate::abi::coursesubgraph_contract::Event as CoursesubgraphEvent;

use substreams::Hex;
use cainome::cairo_serde::CairoSerde;
use starknet::core::types::Felt;
use substreams::log;
use crate::pb::sf::substreams::starknet::r#type::v1::Transactions;
use num_traits::cast::ToPrimitive;
use starknet::core::types::EmittedEvent;
#[substreams::handlers::map]
fn map_orgsubgraph_events(transactions: Transactions) -> Result<Events, substreams::errors::Error> {
    let mut proto_events = Events::default();
    for transaction in transactions.transactions_with_receipt {
        let data = transaction.receipt.unwrap();

        let data_events = data.events;

        for event in data_events {
            let event_from_address = Hex(event.from_address.as_slice()).to_string();

            if event_from_address != "0646f8f39ea645470a85edbee5cae24c37d8b0c524e7abed04bb98d858c89c0a" {
                continue;
            }

            let mut data_felts = vec![];
            let mut keys_felts = vec![];
            for key in event.keys {
                let key = Felt::from_bytes_be_slice(key.as_slice());
                keys_felts.push(key);
            }

            for bytes in event.data {
                let felt = Felt::from_bytes_be_slice(bytes.as_slice());
                data_felts.push(felt);
            }

            let emitted_event = EmittedEvent {
                from_address: Felt::from_bytes_be_slice(event.from_address.as_slice()),
                keys: keys_felts,
                data: data_felts,
                block_hash: None,
                block_number: None,
                transaction_hash: Felt::default(),
            };

            if let orgsubgraph_event = OrgsubgraphEvent::try_from(emitted_event).unwrap() {
                let event_json = serde_json::to_string(&orgsubgraph_event).unwrap();
                let event = Event {
                    json_description: event_json,
                    block_number: transactions.clock.clone().unwrap().number,
                    block_timestamp: transactions
                        .clock
                        .clone()
                        .unwrap()
                        .timestamp
                        .unwrap()
                        .seconds,
                };

                proto_events.events.push(event);
            }
        }
    }

    Ok(proto_events)
}
#[substreams::handlers::map]
fn map_eventsubgraph_events(transactions: Transactions) -> Result<Events, substreams::errors::Error> {
    let mut proto_events = Events::default();
    for transaction in transactions.transactions_with_receipt {
        let data = transaction.receipt.unwrap();

        let data_events = data.events;

        for event in data_events {
            let event_from_address = Hex(event.from_address.as_slice()).to_string();

            if event_from_address != "0699e49b9b193554ceed38ef9477f771f2cd3a65a71832ea342ba63540d736cb" {
                continue;
            }

            let mut data_felts = vec![];
            let mut keys_felts = vec![];
            for key in event.keys {
                let key = Felt::from_bytes_be_slice(key.as_slice());
                keys_felts.push(key);
            }

            for bytes in event.data {
                let felt = Felt::from_bytes_be_slice(bytes.as_slice());
                data_felts.push(felt);
            }

            let emitted_event = EmittedEvent {
                from_address: Felt::from_bytes_be_slice(event.from_address.as_slice()),
                keys: keys_felts,
                data: data_felts,
                block_hash: None,
                block_number: None,
                transaction_hash: Felt::default(),
            };

            if let eventsubgraph_event = EventsubgraphEvent::try_from(emitted_event).unwrap() {
                let event_json = serde_json::to_string(&eventsubgraph_event).unwrap();
                let event = Event {
                    json_description: event_json,
                    block_number: transactions.clock.clone().unwrap().number,
                    block_timestamp: transactions
                        .clock
                        .clone()
                        .unwrap()
                        .timestamp
                        .unwrap()
                        .seconds,
                };

                proto_events.events.push(event);
            }
        }
    }

    Ok(proto_events)
}
#[substreams::handlers::map]
fn map_coursesubgraph_events(transactions: Transactions) -> Result<Events, substreams::errors::Error> {
    let mut proto_events = Events::default();
    for transaction in transactions.transactions_with_receipt {
        let data = transaction.receipt.unwrap();

        let data_events = data.events;

        for event in data_events {
            let event_from_address = Hex(event.from_address.as_slice()).to_string();

            if event_from_address != "02d876f20d2ed89f91ca59e559e954dc78a4e81abd6bf7831ef238a2adfbef24" {
                continue;
            }

            let mut data_felts = vec![];
            let mut keys_felts = vec![];
            for key in event.keys {
                let key = Felt::from_bytes_be_slice(key.as_slice());
                keys_felts.push(key);
            }

            for bytes in event.data {
                let felt = Felt::from_bytes_be_slice(bytes.as_slice());
                data_felts.push(felt);
            }

            let emitted_event = EmittedEvent {
                from_address: Felt::from_bytes_be_slice(event.from_address.as_slice()),
                keys: keys_felts,
                data: data_felts,
                block_hash: None,
                block_number: None,
                transaction_hash: Felt::default(),
            };

            if let coursesubgraph_event = CoursesubgraphEvent::try_from(emitted_event).unwrap() {
                let event_json = serde_json::to_string(&coursesubgraph_event).unwrap();
                let event = Event {
                    json_description: event_json,
                    block_number: transactions.clock.clone().unwrap().number,
                    block_timestamp: transactions
                        .clock
                        .clone()
                        .unwrap()
                        .timestamp
                        .unwrap()
                        .seconds,
                };

                proto_events.events.push(event);
            }
        }
    }

    Ok(proto_events)
}
