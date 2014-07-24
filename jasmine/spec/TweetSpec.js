describe("Tweet", function() {
  var tweet;

  beforeEach(function() {
    tweet = new Tweet({
      id: 1,
      username: "bob",
      content: "tweet tweet",
      longitude: 72.45,
      latitude: 54.34,
      twitter_id: "9048750982374098234",
      location: "Chicago, IL",
      stars: 1
    });
  });

  it("is a Tweet", function() {
    console.log(tweet.created_at)
    expect(tweet instanceof Tweet).toBe(true);
  });

  it("should store the correct information", function() {
    expect(tweet.username).toBe("bob");
  });

  //   it("should be possible to resume", function() {
  //     player.resume();
  //     expect(player.isPlaying).toBeTruthy();
  //     expect(player.currentlyPlayingSong).toEqual(song);
  //   });
  // });

  // // demonstrates use of spies to intercept and test method calls
  // it("tells the current song if the user has made it a favorite", function() {
  //   spyOn(song, 'persistFavoriteStatus');

  //   player.play(song);
  //   player.makeFavorite();

  //   expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
  // });

  // //demonstrates use of expected exceptions
  // describe("#resume", function() {
  //   it("should throw an exception if song is already playing", function() {
  //     player.play(song);

  //     expect(function() {
  //       player.resume();
  //     }).toThrowError("song is already playing");
  //   });
  // });
});
