use cainome::rs::Abigen;
use std::collections::HashMap;

fn main() {
    // Aliases added from the ABI
    let mut aliases = HashMap::new();
    aliases.insert(
        String::from("openzeppelin_upgrades::upgradeable::UpgradeableComponent::Event"),
        String::from("UpgradeableComponentEvent"),
    );
    aliases.insert(
        String::from("openzeppelin_access::ownable::ownable::OwnableComponent::Event"),
        String::from("OwnableComponentEvent"),
    );

    let coursesubgraph_abigen =
        Abigen::new("coursesubgraph", "./abi/coursesubgraph_contract.abi.json").with_types_aliases(aliases).with_derives(vec!["serde::Serialize".to_string(), "serde::Deserialize".to_string()]);

        coursesubgraph_abigen
            .generate()
            .expect("Fail to generate bindings")
            .write_to_file("./src/abi/coursesubgraph_contract.rs")
            .unwrap();
    // Aliases added from the ABI
    let mut aliases = HashMap::new();
    aliases.insert(
        String::from("openzeppelin_access::ownable::ownable::OwnableComponent::Event"),
        String::from("OwnableComponentEvent"),
    );
    aliases.insert(
        String::from("openzeppelin_upgrades::upgradeable::UpgradeableComponent::Event"),
        String::from("UpgradeableComponentEvent"),
    );

    let eventsubgraph_abigen =
        Abigen::new("eventsubgraph", "./abi/eventsubgraph_contract.abi.json").with_types_aliases(aliases).with_derives(vec!["serde::Serialize".to_string(), "serde::Deserialize".to_string()]);

        eventsubgraph_abigen
            .generate()
            .expect("Fail to generate bindings")
            .write_to_file("./src/abi/eventsubgraph_contract.rs")
            .unwrap();
    // Aliases added from the ABI
    let mut aliases = HashMap::new();
    aliases.insert(
        String::from("openzeppelin_access::ownable::ownable::OwnableComponent::Event"),
        String::from("OwnableComponentEvent"),
    );
    aliases.insert(
        String::from("openzeppelin_upgrades::upgradeable::UpgradeableComponent::Event"),
        String::from("UpgradeableComponentEvent"),
    );

    let orgsubgraph_abigen =
        Abigen::new("orgsubgraph", "./abi/orgsubgraph_contract.abi.json").with_types_aliases(aliases).with_derives(vec!["serde::Serialize".to_string(), "serde::Deserialize".to_string()]);

        orgsubgraph_abigen
            .generate()
            .expect("Fail to generate bindings")
            .write_to_file("./src/abi/orgsubgraph_contract.rs")
            .unwrap();
}