import { Protobuf } from "as-proto/assembly";
import { Events as protoEvents } from "./pb/starknet/v1/Events";
import {
  MyEntity,
  CourseCreated,
  CourseReplaced,
  CourseCertClaimed,
  AdminTransferred,
  CourseSuspended,
  CourseUnsuspended,
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

    if (!jsonDescription) continue;

    const jsonObj = jsonDescription.toObject();
    // Handle course created event
    if (jsonObj.get("CourseCreated")) {
      const courseCreated = jsonObj.get("CourseCreated")!.toObject();
      const courseIdentifierValue = courseCreated.get("course_identifier")!;
      const courseIdentifier = BigInt.fromString(
        courseIdentifierValue.toU64().toString()
      );


      const courseOwner = courseCreated.get("owner_")!.toString();

      const courseAccessment = courseCreated.get("accessment_")!.toString();

      //handle base uri
      const baseUriObj = courseCreated.get("base_uri")!.toObject();
      const baseUris: string[] = [];

      const uriData = baseUriObj.get("data")!.toArray();
      for (let j = 0; j < uriData.length; j++) {
        baseUris.push(hexToString(uriData[j].toString()));
      }

      // Process pending word if exists
      const pendingWord = baseUriObj.get("pending_word");
      if (pendingWord) {
        baseUris.push(hexToString(pendingWord.toString()));
      }

      // handle for the name
      const nameObj = courseCreated.get("name_")!.toObject();
      const nameArrays: string[] = [];

      const nameData = nameObj.get("data")!.toArray();
      for (let j = 0; j < nameData.length; j++) {
        nameArrays.push(hexToString(nameData[j].toString()));
      }

      // Process pending word if exists
      const namePendingWord = nameObj.get("pending_word");
      if (namePendingWord) {
        nameArrays.push(hexToString(namePendingWord.toString()));
      }

      // handle for the symbol
      const symObj = courseCreated.get("symbol")!.toObject();
      const symArrays: string[] = [];

      const symData = symObj.get("data")!.toArray();
      for (let j = 0; j < symData.length; j++) {
        symArrays.push(hexToString(symData[j].toString()));
      }

      // Process pending word if exists
      const symPendingWord = symObj.get("pending_word");
      if (symPendingWord) {
        symArrays.push(hexToString(symPendingWord.toString()));
      }

      // handle for the course ipfs uri
      const courseIpfsUriObj = courseCreated.get("course_ipfs_uri")!.toObject();
      const courseIpfsUris: string[] = [];

      const courseIpfsData = courseIpfsUriObj.get("data")!.toArray();
      for (let j = 0; j < courseIpfsData.length; j++) {
        courseIpfsUris.push(hexToString(courseIpfsData[j].toString()));
      }

      // Process pending word if exists
      const courseIPFSPendingWord = courseIpfsUriObj.get("pending_word");
      if (courseIPFSPendingWord) {
        courseIpfsUris.push(hexToString(courseIPFSPendingWord.toString()));
      }

      // create course entity
      const courseId = `${courseOwner}-${courseIdentifier}`;
      // const courseId = crypto
      // .keccak256(Bytes.fromUTF8(event.jsonDescription))
      // .toHexString();
      let course = CourseCreated.load(courseId);
      if (!course) {
        course = new CourseCreated(courseId);
      }

      course.id = courseId;
      course.course_identifier = courseIdentifier;
      course.owner_ = courseOwner;
      course.accessment_ = courseAccessment === "true";
      course.base_uri = baseUris;
      course.name_ = nameArrays;
      course.symbol = symArrays;
      course.course_ipfs_uri = courseIpfsUris;
      course.save();
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
