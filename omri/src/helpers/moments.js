import { ref } from '../config/constants'

export function saveMoment (uid, moment) {
  var moments = ref.child("moments");
  return moments.push().set({
    uid: uid,
    moment: moment,
  });
}