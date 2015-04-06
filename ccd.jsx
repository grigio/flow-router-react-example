if (Meteor.isClient) {
  Comments = new Mongo.Collection('comments');
  Categories = new Mongo.Collection('categories');
  FlowRouter.route('/blog/:pageId', {
    subscriptions: function(params) {
      this.register('blogCategories', Meteor.subscribe('categories'));
      this.register('currentPost', Meteor.subscribe('post', params.pageId));
      this.register('currentComments', Meteor.subscribe('comments', params.pageId));
    },

    action: function() {
      // We render the template with React
      React.render(<Page />, document.getElementById('yield'));
    }
  });
}

if (Meteor.isServer) {
  Meteor.publish('categories', function() {
    var self = this;
    Meteor.defer(function() {
      self.added('categories', 'id1', {text: "Cat 1"});
      self.added('categories', 'id2', {text: "Cat 2"});
      Meteor._sleepForMs(1500);
      self.ready();
    });
  });

  Meteor.publish('comments', function() {
    var self = this;
    Meteor.defer(function() {
      self.added('comments', 'id1', {text: "Comment 1"});
      Meteor._sleepForMs(200);
      self.added('comments', 'id2', {text: "Comment 2"});
      Meteor._sleepForMs(200);
      self.added('comments', 'id3', {text: "Comment 3"});
      Meteor._sleepForMs(200);
      self.added('comments', 'id4', {text: "Comment 4"});
      Meteor._sleepForMs(200);
      self.ready();
    });
  });

  Meteor.publish('post', function() {
    var self = this;
    Meteor.defer(function() {
      Meteor._sleepForMs(500);
      self.ready();
    });
  });
}
