function main(){

  var eachMatchup = []
  var weeklyMatchups = []
  let finalMatchups = {}
  let previousWeekMatchups = []
  var allWeeks = []
  var isDuplicate;
  var seasonLength = 14
  var divisionalGames = 2
  var divisionalOpponents = 4
  var totalDivisional = divisionalGames * divisionalOpponents

  var divMatchup = true;
  var records = {} //leagueMemberRecords

  let teams = []
  let leagueDivision = {}

  function getContent(){
    let modalBody = document.querySelector('.modal-body')
    modalBody.innerHTML = "from info"
  }


  function getAllInputs(){
    let numTeams = 0;
    let divisionInputs = document.querySelectorAll('[id^=division]')
    for(let j=0; j<divisionInputs.length; j++){
      let divisionInput = divisionInputs[j]
      teamInputsParent = divisionInput.nextElementSibling
      let teamsInThisDivision = []
      for(let k=0; k<teamInputsParent.childElementCount; k++){
        teamInputs = teamInputsParent.children[k]
        numTeams++
        if(teamInputs.children[0].value==''){
          teamInputs.children[0].value = numTeams
        }
        teamsInThisDivision.push(teamInputs.children[0].value)
        teams.push(teamInputs.children[0].value)
      }
      leagueDivision[divisionInputs[j].innerHTML] = teamsInThisDivision
    }
  }

  getAllInputs()

  class team{
    constructor(name){
    this.name = name
    this.opponents = []
    }
  }

  function createRecordsDatabase(){
    for(let i=0; i<teams.length; i++){
      records[teams[i]] = new team(teams[i])
    }return records
  }

  function addToRecords(matchup){
    for(let i=0; i<matchup.length; i++){
      //records team1
      records[matchup[i][0]].opponents.push(matchup[i][1])
      //records team2
      records[matchup[i][1]].opponents.push(matchup[i][0])
    }
  }

  function clearRecords(leagueRecords){
    for(team in leagueRecords){
      while(leagueRecords[team].opponents.length > 0){
        leagueRecords[team].opponents.pop()
      }
    }
  }

  function clearFinalMatchups(finalMatches){
    for (let prop in finalMatches){
      delete finalMatches[prop]
    }
  }


  //function weightDivisional
  function considerDivision(){
    let weight = Math.random()
    if(weight <= 0.93){ //giving divisional matchup attempt a 93% percent chance
      return tryDivisionalMatchup = true
    }return tryDivisionalMatchup = false
  }


  ///create a function for max non-divisional games. Thereby forcing extra division games
  function nonDivisionalMaxCount(team, potentialOpponent){
    let count = 0;
    sameDivisionCheck(team, potentialOpponent, leagueDivision)
    if(isSameDivision){return isNonDivisionalMax = false}
    for(let i=0; i<records[team].opponents.length; i++){
      sameDivisionCheck(team, records[team].opponents[i], leagueDivision)
      if(!isSameDivision){
        count++
        
      }
    }

    if(count >= seasonLength - totalDivisional){//is number of calced nonDiv games greater than preferred
      return isNonDivisionalMax = true
    }return isNonDivisionalMax = false
  }

  //Checks for back-to-back schedules
  var lastWeekMatchupCheck = function (thisMatchup, lastWeekSchedule){
    for(let i=0; i<lastWeekSchedule.length; i++){
        if(
            (lastWeekSchedule[i][0] == thisMatchup[0] 
            && lastWeekSchedule[i][1]==thisMatchup[1]) ||
            (lastWeekSchedule[i][0] == thisMatchup[1] 
            && lastWeekSchedule[i][1]==thisMatchup[0])
          ) {
              return isLastWeekMatchup = true
          }
    } 
    return isLastWeekMatchup = false
  }



  //Checks if in the same division
  var sameDivisionCheck = function(team1, team2, league){
    let count, x;
    for (divisions in league){
      count = 0; x=0
      while(x < league[divisions].length){
        if(league[divisions][x]==team1 || league[divisions][x]==team2){
          count++
        }x++
        if(count==2){
          return isSameDivision = true
        }
      } 
    }
    return isSameDivision = false
  }

  var generateNum = function (){
    return Math.random()
  }

  var duplicateMatchupTest = function (team1, team2, arr){
    let tempArr = []
    for(var i=0; i<arr.length; i++){
      for(var j=0; j<arr[i].length; j++){
        tempArr.push(arr[i][j])
      }
    }

    let a = 0; let counter = 0;
    while(a<tempArr.length){
      if((team1 == tempArr[a][0] && team2 == tempArr[a][1]) || (team2 == tempArr[a][0] && team1 == tempArr[a][1])){
        counter++; 
      }
      a++;
    }
    if(divMatchup){
        if(counter > 0){
          sameDivisionCheck(team1, team2, leagueDivision)
            if(isSameDivision && counter < divisionalGames){
              return isDuplicate = false
            }
            else if(!isSameDivision){
              return isDuplicate = true
            }
            else return isDuplicate = true
        }else {
          return isDuplicate = false
          }
    }
    else{
      if(counter > 0){
        return isDuplicate = true
      }else {
        return isDuplicate = false
      }
    }

  }


  createRecordsDatabase()
  for(k=0; k<seasonLength; k++){
    let teamList = teams.slice()
    let dupTestCounter = 0;
    let failedAttempt = 0;

    for(i=0; i<teams.length/2; i++){
      let oneTeam;
      let tryDivMatchup = 0;
      for (j=0; j<2; j++){
        var len = teamList.length
        var randomIndex = Math.floor(generateNum()*len)

        considerDivision()
        while(j==1 && tryDivisionalMatchup){//if/while j==1 and considerDivisional chance hits...
          sameDivisionCheck(oneTeam, teamList[randomIndex], leagueDivision)      
          if(isSameDivision || tryDivMatchup > 10){break}
          randomIndex = Math.floor(generateNum()*len)
          tryDivMatchup++
        }
        while(j==1 && dupTestCounter<15){
            duplicateMatchupTest(oneTeam, teamList[randomIndex], allWeeks)
            if(k>0){
              isFirstTeamMax = nonDivisionalMaxCount(oneTeam, teamList[randomIndex])
              isSecondTeamMax = nonDivisionalMaxCount(teamList[randomIndex], oneTeam)
            }
            if(isDuplicate || (k>0 && (isFirstTeamMax || isSecondTeamMax))){
                randomIndex = Math.floor(generateNum()*len)
                dupTestCounter++
                if(dupTestCounter==15){
                  break
                }
            }
            else break
        }
        if(dupTestCounter == 15){break} 
        oneTeam = teamList.splice(randomIndex, 1)[0]
        eachMatchup.push(oneTeam)
      }
      //if a duplicate is found and program unable to find new combo, clear current arrays and recalc
      if(dupTestCounter == 15){
        //console.log('failedAttempt ', failedAttempt++)
        failedAttempt++
        i=-1
        weeklyMatchups = []
        eachMatchup = []
        teamList = teams.slice()
        dupTestCounter = 0
        if(failedAttempt > 20){
          //console.log('failedAttemptMax')
          k=0
          weeklyMatchups = []
          allWeeks = []
          clearRecords(records)
          previousMatchups = []
          clearFinalMatchups(finalMatchups)
          continue
        }
        continue
      }
      if(k>0){
        lastWeekMatchupCheck(eachMatchup, previousWeekMatchups)
        if(isLastWeekMatchup){
          i=-1
          weeklyMatchups = []
          eachMatchup = []
          teamList = teams.slice()
          dupTestCounter = 0
          continue
        }
      }
      weeklyMatchups.push(eachMatchup)
      eachMatchup = []
    }
    let header = `Week ${k+1} Matchups:`
    //console.log(header)
    allWeeks.push(weeklyMatchups)
    //add to record here, because recalc for new combo is already complete...
    addToRecords(weeklyMatchups)
    previousWeekMatchups = weeklyMatchups
    finalMatchups[header]=weeklyMatchups
    weeklyMatchups = []
  }

  //console.log("All Matchups:")
  //console.log(allWeeks)
  //console.log(records)


  let tableArr = []
  let topHeader;
  let columns = ['Team 1', 'Team 2']

  for(let i=0; i<allWeeks.length; i++){
    let table = document.createElement('table')

    groupHeader = document.createElement('thead')
    groupHeaderRow = groupHeader.insertRow(-1)
    
    groupHeaderCell = document.createElement('th')
    groupHeaderCell.innerHTML = `Week ${i+1} Matchups`
    groupHeaderCell.setAttribute("colspan", 2)
    groupHeaderRow.appendChild(groupHeaderCell)


    table.appendChild(groupHeader)

    //header cell
    let row = table.insertRow(-1)
    for(let j=0; j<columns.length; j++){
      headerCell = document.createElement('th')
      headerCell.innerHTML = columns[j]
      row.appendChild(headerCell)
    }

    //data
    for(let k=0; k<allWeeks[i].length; k++){
      row = table.insertRow(-1)
      for(let x=0; x<columns.length; x++){
        let cell = row.insertCell(-1)
        cell.innerHTML = allWeeks[i][k][x]

      }

    }
    tableArr.push(table)
  }

  let outputTables = document.getElementById('output-area')
  outputTables.innerHTML = ""
  let y = 0
  while(y<tableArr.length){
    outputTables.appendChild(tableArr[y])
    y++
  }

}
