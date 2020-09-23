import Swal from "sweetalert2"
export default class NotificationService {

  static async confirmAction(title = "Are you sure", text = "You won't be able to revert this!") {
    try {
      let res = await Swal.fire({
        title: title,
        text: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'blue',
        cancelButtonColor: 'orange',
        confirmButtonText: 'Yes, delete it!'
      })
      if (res.value) {
        return true
      }
      return false
    } catch (error) {

    }
  }

  static toast(title = "Default Toast", timer = 5000, icon = "info") {
    // @ts-ignore
    Swal.fire({
      title: title,
      icon: icon,
      iconHtml: `<img
        src="https://media4.giphy.com/media/QBd2kLB5qDmysEXre9/giphy.gif"
        style="width: 50px"
        alt
      />`,
      timer: timer,
      toast: true,
      position: "top-right",
      showConfirmButton: false,
      timerProgressBar: true
    })
  }

  static async inputCarData(title = "Create Form") {
    try {
      const { value: formValues } = await Swal.fire({
        title: title,
        html:
          '<input id="swal-input1" class="swal2-input">' +
          '<input id="swal-input2" class="swal2-input">',
        focusConfirm: false,
        preConfirm: () => {
          return [
            document.getElementById('swal-input1').value,
            document.getElementById('swal-input2').value
          ]
        }
      })
      if (formValues) {
        return { title: formValues[0], description: formValues[1] }
      }
    } catch (error) {
      return false
    }
  }
  static async inputData(title = "Create Form") {
    try {
      const { value: formValues } = await Swal.fire({
        title: title,
        html:
          '<input id="swal-input1" class="swal2-input" placeholder="Title">' +
          '<input id="swal-input2" class="swal2-input" placeholder="Description">',
        focusConfirm: false,
        preConfirm: () => {
          return [
            document.getElementById('swal-input1').value,
            document.getElementById('swal-input2').value
          ]
        }
      })
      if (formValues) {
        return { title: formValues[0], description: formValues[1] }
      }
    } catch (error) {
      return false
    }
  }

}