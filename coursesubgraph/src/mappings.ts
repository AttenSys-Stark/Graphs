import { Protobuf } from "as-proto/assembly";
import { Events as protoEvents } from "./pb/starknet/v1/Events";
import {
  MyEntity,
  CourseCreated,
  CourseReplaced,
  CourseCertClaimed,
  AdminTransferred,
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
    // Handle course created event
    if (jsonObj.get("CourseCreated")) {
      const courseCreated = jsonObj.get("CourseCreated")!.toObject();
      const courseOwner = courseCreated.get("owner_")!.toString();
      const block_no = BigInt.fromString(blockNumber.toString());
      const unix_time = BigInt.fromString(timesStamp.toString());
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
      const courseId = crypto
        .keccak256(Bytes.fromUTF8(event.jsonDescription))
        .toHexString();
      let course = CourseCreated.load(courseId);
      if (!course) {
        course = new CourseCreated(courseId);
      }

      course.id = courseId;
      course.owner_ = courseOwner; // address
      course.base_uri = baseUris; // ByteArray
      course.name_ = nameArrays; // ByteArray
      course.symbol = symArrays; // ByteArray
      course.course_ipfs_uri = courseIpfsUris; // ByteArray
      course.block_number = block_no;
      course.block_timestamp = unix_time;
      course.save();
    }

    // Handle course replaced event
    if (jsonObj.get("CourseReplaced")) {
      const courseReplaced = jsonObj.get("CourseReplaced")!.toObject();
      const courseOwner = courseReplaced.get("owner_")!.toString();
      const courseReplacedUriObj = courseReplaced
        .get("new_course_uri")!
        .toObject();
      const courseReplacedUris: string[] = [];
      const block_no = BigInt.fromString(blockNumber.toString());
      const unix_time = BigInt.fromString(timesStamp.toString());

      const courseReplacedData = courseReplacedUriObj.get("data")!.toArray();
      for (let j = 0; j < courseReplacedData.length; j++) {
        courseReplacedUris.push(hexToString(courseReplacedData[j].toString()));
      }

      // Process pending word if exists
      const courseReplacedPendingWord = courseReplacedUriObj.get(
        "pending_word"
      );
      if (courseReplacedPendingWord) {
        courseReplacedUris.push(
          hexToString(courseReplacedPendingWord.toString())
        );
      }

      // create course replaced entity
      const courseId = crypto
        .keccak256(Bytes.fromUTF8(event.jsonDescription))
        .toHexString();
      let course = CourseReplaced.load(courseId);
      if (!course) {
        course = new CourseReplaced(courseId);
      }

      course.id = courseId;
      course.owner_ = courseOwner;
      course.new_course_uri = courseReplacedUris;
      course.block_number = block_no;
      course.block_timestamp = unix_time;
      course.save();
    }

    // Handle course cert claimed event
    if (jsonObj.get("CourseCertClaimed")) {
      const courseCertClaimed = jsonObj.get("CourseCertClaimed")!.toObject();

      const courseCandidate = courseCertClaimed.get("candidate")!.toString();
      const block_no = BigInt.fromString(blockNumber.toString());
      const unix_time = BigInt.fromString(timesStamp.toString());

      // create course cert claimed entity
      const courseId = crypto
        .keccak256(Bytes.fromUTF8(event.jsonDescription))
        .toHexString();
      let course = CourseCertClaimed.load(courseId);
      if (!course) {
        course = new CourseCertClaimed(courseId);
      }

      course.id = courseId;
      course.candidate = courseCandidate;
      course.block_number = block_no;
      course.block_timestamp = unix_time;
      course.save();
    }

    // Handle admin transferred event
    if (jsonObj.get("AdminTransferred")) {
      const adminTransferred = jsonObj.get("AdminTransferred")!.toObject();
      const adminTransferredAddress = adminTransferred
        .get("new_admin")!
        .toString();
        const block_no = BigInt.fromString(blockNumber.toString());
        const unix_time = BigInt.fromString(timesStamp.toString());

      // create admin transferred entity
      const courseId = crypto
        .keccak256(Bytes.fromUTF8(event.jsonDescription))
        .toHexString();
      let course = AdminTransferred.load(courseId);
      if (!course) {
        course = new AdminTransferred(courseId);
      }

      course.id = courseId;
      course.new_admin = adminTransferredAddress;
      course.block_number = block_no;
      course.block_timestamp = unix_time;
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
