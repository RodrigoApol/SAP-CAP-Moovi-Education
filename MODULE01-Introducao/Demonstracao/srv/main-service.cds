using {cap.schema as db} from '../db/schema';

@path: '/users-api'
service MainService {
    entity Users as projection on db.User;

    function getPersonById(id: Integer) returns {
        person : {
            name   : String;
            height : String;
            mass   : String;
            gender : String;
        }
    }
}
