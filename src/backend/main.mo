import Map "mo:core/Map";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";

actor {
  type ContentId = Text;

  type Content = {
    title : Text;
    body : Text;
  };

  module Content {
    public func compare(content1 : Content, content2 : Content) : Order.Order {
      Text.compare(content1.title, content2.title);
    };
  };

  let contents = Map.empty<ContentId, Content>();

  public shared ({ caller }) func createContent(id : ContentId, title : Text, body : Text) : async () {
    if (contents.containsKey(id)) {
      Runtime.trap("Content with this ID already exists");
    };
    let content : Content = { title; body };
    contents.add(id, content);
  };

  public shared ({ caller }) func updateContent(id : ContentId, title : Text, body : Text) : async () {
    switch (contents.get(id)) {
      case (null) { Runtime.trap("Content not found") };
      case (?_) {
        let updatedContent : Content = { title; body };
        contents.add(id, updatedContent);
      };
    };
  };

  public query ({ caller }) func getContent(id : ContentId) : async Content {
    switch (contents.get(id)) {
      case (null) { Runtime.trap("Content not found") };
      case (?content) { content };
    };
  };

  public shared ({ caller }) func deleteContent(id : ContentId) : async () {
    switch (contents.containsKey(id)) {
      case (true) { contents.remove(id) };
      case (false) { Runtime.trap("Content not found") };
    };
  };

  public query ({ caller }) func getAllContents() : async [Content] {
    contents.values().toArray();
  };
};
