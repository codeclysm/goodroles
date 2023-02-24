import {
  type WithFieldValue,
  type FirestoreDataConverter,
  type DocumentData,
  type QueryDocumentSnapshot,
  type SnapshotOptions,
  type DocumentReference,
  Timestamp
} from 'firebase/firestore';

type Role = {
  ref: DocumentReference,
  id: string,
  uid: string,
  date: Timestamp,
  game: string,
  comments: string,
};

export const roleConverter: FirestoreDataConverter<Role> = {
  toFirestore(role: WithFieldValue<Role>): DocumentData {
    return { uid: role.uid };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Role {
    const data = snapshot.data(options);

    if (!(data.date instanceof Timestamp)) {
      throw new Error("date should be a Timestamp")
    }

    const game = data.game ? String(data.game) : "";
    const comments = data.comments ? String(data.comments) : "";

    return {
      ref: snapshot.ref,
      id: snapshot.id,
      uid: String(data.uid),
      date: data.date,
      game,
      comments,
    };
  },
};