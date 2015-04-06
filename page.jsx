if (Meteor.isClient) {  

  Page = React.createClass({
    mixins: [ DDPMixin, ReactiveMixin ],
    getReactiveState: function() {

      return {
        postContent: this.getPostContent(),
        categories: this.getCategories(),
        comments: this.getComments()
      }
    },

    getPostContent:function () {
      if (FlowRouter.subsReady('currentPost'))
        return "This is a very cool blog post"
      else
        return "loading post.."
    },

    getCategories: function() {
      // render categories after all subscriptions are ready
      if (FlowRouter.subsReady()) {
        var categories = Categories.find().fetch();
        return _.pluck(categories, 'text').join(', ');
      } 
    },

    getComments:function () {
      // Render comments as they came
      return Comments.find();
    },

    renderComment: function(model) {
      return (
          <p key={model._id}>{model.text}</p>
      )
    },

    render: function() {

      return (
        <div className="page">
          <h1>My Blog</h1>
          {this.state.postContent}
          <div className="categories">
            <h3>Categories</h3>
              Categories: {this.state.categories}
          </div>
            <div className="comments">
            <h4>Comments</h4>
              {this.state.comments.map(this.renderComment)}
          </div>
        </div>
      )
    }

  });
}