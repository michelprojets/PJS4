    <h2 class="display-4" >Description</h2>
<p> <?php echo($lanPage['Description']) ?></p>
<!--
 <script type="text/javascript" src="vue/ckeditor/ckeditor.js"></script>
<form>
            <textarea name="editor1" id="editor1" rows="10" cols="80">
                This is my textarea to be replaced with CKEditor.
            </textarea>
            <script type="text/javascript" >
                // Replace the <textarea id="editor1"> with a CKEditor
                // instance, using default configuration.
                CKEDITOR.replace( 'editor1' );
            </script>
        </form>
-->
<h3>Tournois</h3>
<table class="table table-striped">
    <thead>
      <tr>
        <th>Jeux</th>
        <th>Nombre de Slots</th>
        <th>Joueur/Slots</th>
        <th>Prix du Tournois</th>
      </tr>
    </thead>
    <tbody>
      <?php  afficherTournois($lanPage['IdLan']);   ?>
    </tbody>
  </table>
