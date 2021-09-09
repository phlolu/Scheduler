

function getContent(){
  let aboutModalBody = document.querySelector('.about.modal-body')
  aboutModalBody.innerHTML = "Eight years ago we started a 20 person fantasy football league, promptly calling it Walk The Talk. A 20 team league was and still is highly irregular. <em>Are there even enough players to go around?</em> We wondered. Before long we realized something. You could go elsewhere and do fantasy as usual. But this league was weird. Different. Unique. Frustrating. And in that was the beauty.<br><br>It was not without its fair share of changes. We changed waiver wire rules; who made the playoffs; how trades were assessed. We even decided to place more emphasis on divisions. And that was a problem.<br><br>The fantasy platform we used only gave you a simple randomized schedule. No inputs allowed. But if we wanted to make divisions a determining factor in the playoff race, we needed to alter the schedule such that teams in each division could play each other enough times to make it matter.<br><br>So we googled. Didn't find anything... for 20 teams. So we did it by hand. And it worked. But it was tedious and incredibly so. Eventually we built an Excel template and we were golden. But we had always wanted to do it programmatically.<br><br>Two years ago, at the start of Year 7, we did. We wrote the script, pressed Run and it was beautiful. But it was just a script. Now at Year 9, we've put the finishing touches to make it actually look like an app. A little HTML here. A little CSS there. Voilà.<br><br>This app currently returns a schedule for 20 teams who play 14 games. They play each of their divisional opponents twice and then other non-divisional opponents to round out the schedule.<br><br>In the next iterations of the app, we hope to add user options for number of teams, divisions, divisional games and total games. This is already doable in the script, we just have to make it accessible through the UI. We're even looking to update the script to allow for custom matchups. That is, a user can specify that a team will play an opponent in a specific week. It works great for a kind of Rivalry Week scenario.<br><br>Until then, we'll revel in how far we've come. And hope that the coming days always look better than what came before.<br><br>As we say in our league: \"May your trades be merry, may your barns be full. May you walk with confidence and Walk The Talk.\""

  let howToModalBody = document.querySelector('.howtomodal.modal-body')
  howToModalBody.innerHTML = 
              "20 teams, 14 game schedule. 8 divisional, 6 nondivisional\
                <ul>\
                  <li>Enter each team in its respective division group</li>\
                  <li>If left empty, a team number is provided</li>\
                  <li>Get League Schedule</li>\
                </ul>"


}