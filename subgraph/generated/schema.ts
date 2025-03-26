// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal,
} from "@graphprotocol/graph-ts";

export class myEntity extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save myEntity entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type myEntity must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`,
      );
      store.set("myEntity", id.toString(), this);
    }
  }

  static loadInBlock(id: string): myEntity | null {
    return changetype<myEntity | null>(store.get_in_block("myEntity", id));
  }

  static load(id: string): myEntity | null {
    return changetype<myEntity | null>(store.get("myEntity", id));
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }
}

export class OrganizationProfile extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save OrganizationProfile entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type OrganizationProfile must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`,
      );
      store.set("OrganizationProfile", id.toString(), this);
    }
  }

  static loadInBlock(id: string): OrganizationProfile | null {
    return changetype<OrganizationProfile | null>(
      store.get_in_block("OrganizationProfile", id),
    );
  }

  static load(id: string): OrganizationProfile | null {
    return changetype<OrganizationProfile | null>(
      store.get("OrganizationProfile", id),
    );
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get org_name(): string {
    let value = this.get("org_name");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set org_name(value: string) {
    this.set("org_name", Value.fromString(value));
  }

  get org_ipfs_uri(): Array<string> {
    let value = this.get("org_ipfs_uri");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toStringArray();
    }
  }

  set org_ipfs_uri(value: Array<string>) {
    this.set("org_ipfs_uri", Value.fromStringArray(value));
  }
}

export class InstructorAddedToOrg extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save InstructorAddedToOrg entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type InstructorAddedToOrg must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`,
      );
      store.set("InstructorAddedToOrg", id.toString(), this);
    }
  }

  static loadInBlock(id: string): InstructorAddedToOrg | null {
    return changetype<InstructorAddedToOrg | null>(
      store.get_in_block("InstructorAddedToOrg", id),
    );
  }

  static load(id: string): InstructorAddedToOrg | null {
    return changetype<InstructorAddedToOrg | null>(
      store.get("InstructorAddedToOrg", id),
    );
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get org_name(): string {
    let value = this.get("org_name");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set org_name(value: string) {
    this.set("org_name", Value.fromString(value));
  }

  get instructors(): Array<string> {
    let value = this.get("instructors");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toStringArray();
    }
  }

  set instructors(value: Array<string>) {
    this.set("instructors", Value.fromStringArray(value));
  }
}

export class InstructorRemovedFromOrg extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id != null,
      "Cannot save InstructorRemovedFromOrg entity without an ID",
    );
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type InstructorRemovedFromOrg must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`,
      );
      store.set("InstructorRemovedFromOrg", id.toString(), this);
    }
  }

  static loadInBlock(id: string): InstructorRemovedFromOrg | null {
    return changetype<InstructorRemovedFromOrg | null>(
      store.get_in_block("InstructorRemovedFromOrg", id),
    );
  }

  static load(id: string): InstructorRemovedFromOrg | null {
    return changetype<InstructorRemovedFromOrg | null>(
      store.get("InstructorRemovedFromOrg", id),
    );
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get instructor_addr(): string {
    let value = this.get("instructor_addr");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set instructor_addr(value: string) {
    this.set("instructor_addr", Value.fromString(value));
  }

  get org_owner(): string {
    let value = this.get("org_owner");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set org_owner(value: string) {
    this.set("org_owner", Value.fromString(value));
  }
}

export class BootCampCreated extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save BootCampCreated entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type BootCampCreated must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`,
      );
      store.set("BootCampCreated", id.toString(), this);
    }
  }

  static loadInBlock(id: string): BootCampCreated | null {
    return changetype<BootCampCreated | null>(
      store.get_in_block("BootCampCreated", id),
    );
  }

  static load(id: string): BootCampCreated | null {
    return changetype<BootCampCreated | null>(store.get("BootCampCreated", id));
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get org_name(): string {
    let value = this.get("org_name");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set org_name(value: string) {
    this.set("org_name", Value.fromString(value));
  }

  get bootcamp_name(): string {
    let value = this.get("bootcamp_name");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set bootcamp_name(value: string) {
    this.set("bootcamp_name", Value.fromString(value));
  }

  get nft_name(): string {
    let value = this.get("nft_name");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set nft_name(value: string) {
    this.set("nft_name", Value.fromString(value));
  }

  get nft_symbol(): string {
    let value = this.get("nft_symbol");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set nft_symbol(value: string) {
    this.set("nft_symbol", Value.fromString(value));
  }
}

export class BootcampRegistration extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save BootcampRegistration entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type BootcampRegistration must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`,
      );
      store.set("BootcampRegistration", id.toString(), this);
    }
  }

  static loadInBlock(id: string): BootcampRegistration | null {
    return changetype<BootcampRegistration | null>(
      store.get_in_block("BootcampRegistration", id),
    );
  }

  static load(id: string): BootcampRegistration | null {
    return changetype<BootcampRegistration | null>(
      store.get("BootcampRegistration", id),
    );
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get org_address(): string {
    let value = this.get("org_address");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set org_address(value: string) {
    this.set("org_address", Value.fromString(value));
  }

  get bootcamp_id(): BigInt {
    let value = this.get("bootcamp_id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBigInt();
    }
  }

  set bootcamp_id(value: BigInt) {
    this.set("bootcamp_id", Value.fromBigInt(value));
  }
}
