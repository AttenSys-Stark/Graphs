import { Protobuf } from "as-proto/assembly";
import { Events as protoEvents } from "./pb/starknet/v1/Events";
import {
  MyEntity,
  EventCreated,
  AttendanceMarked,
  RegisteredForEvent,
  RegistrationStatusChanged,
  AdminTransferred,
  AdminOwnershipClaimed,
  BatchCertificationCompleted,
} from "../generated/schema";
import { BigInt, log, crypto, Bytes, json } from "@graphprotocol/graph-ts";

export function handleTriggers(bytes: Uint8Array): void {
  const input = Protobuf.decode<protoEvents>(bytes, protoEvents.decode);

  for (let i = 0; i < input.events.length; i++) {
    const event = input.events[i];
    const eventID = crypto
      .keccak256(Bytes.fromUTF8(event.jsonDescription))
      .toHexString();

    let entity = new MyEntity(eventID);
    entity.save();

    const jsonDescription = json.fromBytes(
      Bytes.fromUTF8(event.jsonDescription)
    );
    const blockNumber = event.blockNumber
    const timesStamp = event.blockTimestamp

    if (!jsonDescription) continue;

    const jsonObj = jsonDescription.toObject();

    // Handle event created event
    if (jsonObj.get("EventCreated")) {
      const eventCreated = jsonObj.get("EventCreated")!.toObject();
      const eventNameObj = eventCreated.get("event_name")!.toObject();
      const eventNameArrays: string[] = [];
      const block_no = BigInt.fromString(blockNumber.toString());
      const unix_time = BigInt.fromString(timesStamp.toString());

      const nameData = eventNameObj.get("data")!.toArray();
      for (let j = 0; j < nameData.length; j++) {
        eventNameArrays.push(hexToString(nameData[j].toString()));
      }

      // Process pending word if exists
      const namePendingWord = eventNameObj.get("pending_word");
      if (namePendingWord) {
        eventNameArrays.push(hexToString(namePendingWord.toString()));
      }

      // handle for the event organizer
      const eventOrganizerAddress = eventCreated
        .get("event_organizer")!
        .toString();

      // handle for the event uri
      const eventUriObj = eventCreated.get("event_uri")!.toObject();
      const eventUriArrays: string[] = [];

      const uriData = eventUriObj.get("data")!.toArray();
      for (let j = 0; j < uriData.length; j++) {
        eventUriArrays.push(hexToString(uriData[j].toString()));
      }

      // Process pending word if exists
      const eventUriPendingWord = eventUriObj.get("pending_word");
      if (eventUriPendingWord) {
        eventUriArrays.push(hexToString(eventUriPendingWord.toString()));
      }

      let event = EventCreated.load(eventID);
      if (!event) {
        event = new EventCreated(eventID);
      }

      event.id = eventID;
      event.event_name = eventNameArrays;
      event.event_organizer = eventOrganizerAddress;
      event.event_uri = eventUriArrays;
      event.block_number = block_no;
      event.block_timestamp = unix_time;
      event.save();
    }

    // Handle attendance marked event
    if (jsonObj.get("AttendanceMarked")) {
      const attendanceMarked = jsonObj.get("AttendanceMarked")!.toObject();
      const attendeeAddress = attendanceMarked.get("attendee")!.toString();
      const block_no = BigInt.fromString(blockNumber.toString());
      const unix_time = BigInt.fromString(timesStamp.toString());

      // create attendance marked entity

      let event = AttendanceMarked.load(eventID);
      if (!event) {
        event = new AttendanceMarked(eventID);
      }

      event.id = eventID;
      event.attendee = attendeeAddress;
      event.block_number = block_no;
      event.block_timestamp = unix_time;
      event.save();
    }

    // Handle registered for event event
    if (jsonObj.get("RegisteredForEvent")) {
      const registeredForEvent = jsonObj.get("RegisteredForEvent")!.toObject();
      const attendeeAddress = registeredForEvent.get("attendee")!.toString();
      const block_no = BigInt.fromString(blockNumber.toString());
      const unix_time = BigInt.fromString(timesStamp.toString());

      let event = RegisteredForEvent.load(eventID);
      if (!event) {
        event = new RegisteredForEvent(eventID);
      }

      event.id = eventID;
      event.attendee = attendeeAddress;
      event.block_number = block_no;
      event.block_timestamp = unix_time;
      event.save();
    }

    // Handle registration status changed event
    if (jsonObj.get("RegistrationStatusChanged")) {
      const block_no = BigInt.fromString(blockNumber.toString());
      const unix_time = BigInt.fromString(timesStamp.toString());
      const registrationStatusChanged = jsonObj
        .get("RegistrationStatusChanged")!
        .toObject();

      const registrationOpen = registrationStatusChanged.get(
        "registration_open"
      )!;
      const registrationValue = BigInt.fromString(
        registrationOpen.toU64().toString()
      );

      let event = RegistrationStatusChanged.load(eventID);
      if (!event) {
        event = new RegistrationStatusChanged(eventID);
      }

      event.id = eventID;
      event.registration_open = registrationValue;
      event.block_number = block_no;
      event.block_timestamp = unix_time;
      event.save();
    }

    // Handle admin transferred event
    if (jsonObj.get("AdminTransferred")) {
      const adminTransferred = jsonObj.get("AdminTransferred")!.toObject();
      const oldAdminAddress = adminTransferred.get("old_admin")!.toString();
      const newAdminAddress = adminTransferred.get("new_admin")!.toString();
      const block_no = BigInt.fromString(blockNumber.toString());
      const unix_time = BigInt.fromString(timesStamp.toString());

      let event = AdminTransferred.load(eventID);
      if (!event) {
        event = new AdminTransferred(eventID);
      }

      event.id = eventID;
      event.old_admin = oldAdminAddress;
      event.new_admin = newAdminAddress;
      event.block_number = block_no;
      event.block_timestamp = unix_time;
      event.save();
    }

    // Handle admin ownership claimed event
    if (jsonObj.get("AdminOwnershipClaimed")) {
      const adminOwnershipClaimed = jsonObj
        .get("AdminOwnershipClaimed")!
        .toObject();
      const newAdminAddress = adminOwnershipClaimed
        .get("new_admin")!
        .toString();

        const block_no = BigInt.fromString(blockNumber.toString());
      const unix_time = BigInt.fromString(timesStamp.toString());

      let event = AdminOwnershipClaimed.load(eventID);
      if (!event) {
        event = new AdminOwnershipClaimed(eventID);
      }

      event.id = eventID;
      event.new_admin = newAdminAddress;
      event.block_number = block_no;
      event.block_timestamp = unix_time;
      event.save();
    }

    // Handle batch certification completed event
    if (jsonObj.get("BatchCertificationCompleted")) {
      const batchCertificationCompleted = jsonObj
        .get("BatchCertificationCompleted")!
        .toObject();
      // Convert to array and process each element
      const certifiedAttendeesData = batchCertificationCompleted
        .get("certified_attendees")!
        .toArray();
        const block_no = BigInt.fromString(blockNumber.toString());
        const unix_time = BigInt.fromString(timesStamp.toString());

      const addressArrays: string[] = [];

      // Loop through the array
      for (let i = 0; i < certifiedAttendeesData.length; i++) {
        const address = certifiedAttendeesData[i].toString();
        // If the address is in hex format (0x...), you might need to clean it
        const cleanAddress = address.startsWith("0x")
          ? address.slice(2)
          : address;
        addressArrays.push(cleanAddress);
      }

      // Now addressArrays contains all the processed addresses
      log.debug("Processed addresses: {}", [addressArrays.toString()]);

      // properly handle for array of certified
      let event = BatchCertificationCompleted.load(eventID);
      if (!event) {
        event = new BatchCertificationCompleted(eventID);
      }

      event.id = eventID;
      event.certified_attendees = addressArrays;
      event.block_number = block_no;
      event.block_timestamp = unix_time;
      event.save();
    }
  }
}

function hexToString(hex: string): string {
  // Remove 0x prefix if present
  if (hex.startsWith("0x")) {
    hex = hex.substr(2);
  }

  let str = "";
  for (let i = 0; i < hex.length; i += 2) {
    const byte = hex.substr(i, 2);
    // Explicitly cast parse result to i32
    const charCode = <i32>parseInt(byte, 16);
    str += String.fromCharCode(charCode);
  }
  return str;
}
