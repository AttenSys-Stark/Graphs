import { Protobuf } from "as-proto/assembly";
import { Events as protoEvents } from "./pb/starknet/v1/Events";
import { myEntity, OrganizationProfile, 
  InstructorAddedToOrg, 
  InstructorRemovedFromOrg, 
  BootCampCreated } from "../generated/schema";
import { BigInt, log, crypto, Bytes, json } from "@graphprotocol/graph-ts";

export function handleTriggers(bytes: Uint8Array): void {
  const input = Protobuf.decode<protoEvents>(bytes, protoEvents.decode);

  for (let i = 0; i < input.events.length; i++) {
    const event = input.events[i];
    const eventID = crypto
      .keccak256(Bytes.fromUTF8(event.jsonDescription))
      .toHexString();

    let entity = new myEntity(eventID);
    entity.save();

    // Parse JSON using AssemblyScript's json module
    const jsonDescription = json.fromBytes(
      Bytes.fromUTF8(event.jsonDescription),
    );
    if (!jsonDescription) continue;

    const jsonObj = jsonDescription.toObject();

    // Handle OrganizationProfile event
    if (jsonObj.get("OrganizationProfile")) {
      const orgProfile = jsonObj.get("OrganizationProfile")!.toObject();
      const orgNameObj = orgProfile.get("org_name")!.toObject();
      const orgName = hexToString(orgNameObj.get("pending_word")!.toString());

      // Handle IPFS URIs
      const ipfsUriObj = orgProfile.get("org_ipfs_uri")!.toObject();
      const ipfsUris: string[] = [];

      // Process existing data array
      const ipfsData = ipfsUriObj.get("data")!.toArray();
      for (let j = 0; j < ipfsData.length; j++) {
        ipfsUris.push(hexToString(ipfsData[j].toString()));
      }

      // Process pending word if exists
      const pendingWord = ipfsUriObj.get("pending_word");
      if (pendingWord) {
        ipfsUris.push(hexToString(pendingWord.toString()));
      }

      // Create profile
      const profileId = `${orgName}-profile`;
      let profile = OrganizationProfile.load(profileId);
      if (!profile) {
        profile = new OrganizationProfile(profileId);
      }
      profile.id = profileId;
      profile.org_name = orgName;
      profile.org_ipfs_uri = ipfsUris;
      profile.save();
    }

     // Handle InstructorOrg event
     if (jsonObj.get("InstructorAddedToOrg")) {
      const instructororg = jsonObj.get("InstructorAddedToOrg")!.toObject();
      const orgNameObj = instructororg.get("org_name")!.toObject();
      const orgName = hexToString(orgNameObj.get("pending_word")!.toString());
      const InstructorAddedToOrgID = `${orgName}-instructors`
      
      // Process ALL instructor addresses
      const instructorArray = instructororg.get("instructor")!.toArray();
      const instructorAddresses: string[] = [];
      
      for (let i = 0; i < instructorArray.length; i++) {
        instructorAddresses.push(instructorArray[i].toString()); 
      }
      

      let instructortororg = InstructorAddedToOrg.load(InstructorAddedToOrgID);
      if (!instructortororg) {
        instructortororg = new InstructorAddedToOrg(InstructorAddedToOrgID);
      }
      instructortororg.org_name = orgName;
      instructortororg.instructors = instructorAddresses;
      instructortororg.save();
     }

     // Handle InstructorRemovedFromOrg event
     if (jsonObj.get("InstructorRemovedFromOrg")) {
      const instructororgremoved = jsonObj.get("InstructorRemovedFromOrg")!.toObject();
      const instructoraddress = instructororgremoved.get("instructor_addr")!.toString();
      const owneraddress = instructororgremoved.get("org_owner")!.toString();

      const InstructorRemovedFromOrgID = `owner-${owneraddress}`
      let removed = InstructorRemovedFromOrg.load(InstructorRemovedFromOrgID);
      if (!removed) {
        removed = new InstructorRemovedFromOrg(InstructorRemovedFromOrgID);
      }
      removed.instructor_addr = instructoraddress;
      removed.org_owner = owneraddress;
      removed.save();
     }

     // Handle CreatedBootcamp event
     if (jsonObj.get("BootCampCreated")) {
      const bootcampcreated = jsonObj.get("BootCampCreated")!.toObject();
      const orgNameObj = bootcampcreated.get("org_name")!.toObject();
      const orgName = hexToString(orgNameObj.get("pending_word")!.toString());

      const bootcampNameObj = bootcampcreated.get("bootcamp_name")!.toObject();
      const bootcampName = hexToString(bootcampNameObj.get("pending_word")!.toString());

      const nftNameObj = bootcampcreated.get("nft_name")!.toObject();
      const Ntf_name = hexToString(nftNameObj.get("pending_word")!.toString());

      const nftsymbolObj = bootcampcreated.get("nft_symbol")!.toObject();
      const Nft_symbol = hexToString(nftsymbolObj.get("pending_word")!.toString());

      const createdID = `${orgName}-${bootcampName}`
      let created = BootCampCreated.load(createdID);
      
      if (!created) {
        created = new BootCampCreated(createdID);
      }
      created.org_name = orgName;
      created.bootcamp_name = bootcampName;
      created.nft_name = Ntf_name;
      created.nft_symbol = Nft_symbol;

      created.save();
     }

     // Handle BootcampRegistration event
     if (jsonObj.get("BootcampRegistration")) {
       const bootcampregistration = jsonObj.get("BootcampRegistration")!.toObject();
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
