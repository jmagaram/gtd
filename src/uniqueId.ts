import { v1 } from 'uuid';
import { UniqueId } from './types';

export default function uniqueId(): UniqueId {
    return v1() as UniqueId;
}