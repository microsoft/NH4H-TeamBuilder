import nh4h from './nh4h';

class Team {
  static APIURL='/solutions';  
 
    
  teamid;
  allteams;
 

  constructor(){
    this.allteams=[];
  }

  getAllTeams=()=>{
    return nh4h.get(Team.APIURL)
    .then((response) => {
      this.allteams=response.data;
    });
  }
  createNewTeam=(body)=>{
    return nh4h.post(Team.APIURL, body)
          .then((response)=>{
            this.teamid=response.data.teamId;
          });
    
  }
  editTeam=(teamid,body)=>{
    return nh4h.put('/solutions/'+teamid,body );
  }
}
export default Team;