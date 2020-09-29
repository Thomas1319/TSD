<template>

<div  id="footer" class="border-top border-light">
        <div id="Content">

            <p>This project has been realized by <strong>Antoine Landrieu</strong> and <strong>Thomas Gurtler</strong></p>

        </div>
  </div>
</template>
<script>
// usage in local component

export default {
	name: "Footer",
};
</script>

<style scoped>

#Content{
    width: 50%;
    margin: 2% 25%;
    text-align: center;
}

#footer{
  background-color :  #343a40;
  color :  #f8f9fa;
  padding: 1%;
    width: 100%;
  
  }
  

</style>