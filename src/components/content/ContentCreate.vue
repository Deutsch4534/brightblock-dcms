<template>
   <div class="note-container">
    <div class="content">
      <div class="header">
        <span class="title">
          <h3>
            <content-edit :content.sync="title"></content-edit>
            <button
              @click="saveContent({title, desc, content})"
              class="btn btn-outline-secondary right">
              Save
            </button>
          </h3>
        </span>
        <span>

        </span>
      </div>
      <div class="desc">
        <content-edit :content.sync="desc"></content-edit>
      </div>
      <div class="">
        <content-edit :content.sync="content"></content-edit>
      </div>
    </div>
   </div>
 </template>

<script>
import ContentEdit from './ContentEdit'

export default {
  name: 'NotesEdit',
  props: [ 'notesId' ],
  data () {
    const note = {}
    return {
      title: note.title || 'Title',
      desc: note.desc || 'Enter your description',
      content: note.content || 'Write your note',
    }
  },
  components: {
    ContentEdit
  },
  methods: {
    saveContent: (note) => {
      // You have the content to save
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .note-container{
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    position: relative;
  }
  .editor {
    flex: 1;
  }
  .save {
    margin: 1.5em 1em;
  }
  .content{
    padding: 20px;
  }
  .header {
    margin: 0.5em 0;
    height: 3em;
  }
  .title {
    width: 70%;
  }
  .right {
    position: absolute;
    top: 20px;
    right: 20px;
  }

</style>
