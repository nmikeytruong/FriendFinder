var friends = require("../data/friends");

module.exports = function(app) {
  // API get request route to display all friends
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  // API post request route to handle incoming survey results and used to match BFF
  app.post("/api/friends", function(req, res) {
    // var object to hold the best matched
    var bFF = {
      name: "",
      photo: "",
      friendDifference: Infinity
    };
    // variables of user 
    var userData = req.body;
    var userScores = userData.scores;
    // variable to calculate difference of survey from friends in database
    var surveyDifference;
    // loop through all the friends in database.
    for (var i = 0; i < friends.length; i++) {
      var currentFriend = friends[i];
      surveyDifference = 0;
      // loop through all the scores of each friend
      for (var j = 0; j < currentFriend.scores.length; j++) {
        var currentFriendScore = currentFriend.scores[j];
        var currentUserScore = userScores[j];

        // calculate the difference between the scores and sum them into the surveyDifference
        surveyDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
      }

      // If the sum of differences is less than the differences of the current bff
      if (surveyDifference <= bFF.friendDifference) {
        // change the bFF to be the new bff.
        bFF.name = currentFriend.name;
        bFF.photo = currentFriend.photo;
        bFF.friendDifference = surveyDifference;
      }
    }

    friends.push(userData);
    res.json(bFF);
  });
};
