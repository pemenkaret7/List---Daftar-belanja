const inputBelanja = document.getElementById("input-belanja");
const inputHarga = document.getElementById("input-harga");
const list = document.getElementById("list-belanja");
const totalHarga = document.getElementById("total");
let namaBarang, hargaBarang, spanHapus, total = 0;
let data = [];
let existingData = JSON.parse(localStorage.getItem('daftarBelanja')) || [];

//localStorage.clear();

function tambahBelanja(){
    if(inputBelanja.value === '' || inputHarga.value === ''){
        alert("Data tidak boleh kosong.");
    }else{

        const harga = parseInt(inputHarga.value.replace(/[^\d]/g, ''));
        existingData.push({ nama: inputBelanja.value, harga: harga });
        localStorage.setItem('daftarBelanja', JSON.stringify(existingData));
        

        const data = JSON.parse(localStorage.getItem("daftarBelanja"));
        list.innerHTML = "";
        data.forEach(item => {
            const li = document.createElement("li");
            li.classList.add("nama-belanja");
            li.innerHTML = item.nama;
            list.appendChild(li);

            hargaBarang = document.createElement("span");
            hargaBarang.innerHTML = "Rp. " + item.harga;
            hargaBarang.classList.add("harga");
            li.appendChild(hargaBarang);

            spanHapus = document.createElement("span");
            spanHapus.id = "hapus-item";
            spanHapus.innerHTML = "\u00d7";
            li.appendChild(spanHapus);
        });
        hitungTotal();
    }
    inputBelanja.value = "";
    inputHarga.value = "";
    //saveData();
}

list.addEventListener("click", function(e){
    if (e.target.tagName === "LI" || (e.target.tagName === "SPAN" && e.target.classList.contains("harga"))) {
        let targetLI = e.target.tagName === "LI" ? e.target : e.target.parentElement;
        targetLI.classList.toggle("checked");
        let targetSpan = targetLI.getElementsByTagName("span")[0];
        targetSpan.classList.toggle("checked");
    }else if(e.target.tagName === "SPAN" && e.target.id === "hapus-item"){
        e.target.parentElement.remove();

        let data = JSON.parse(localStorage.getItem("daftarBelanja"));
        let index = data.findIndex(item => item.nama === e.target.parentElement.innerText);
        data.splice(index, 1);
        localStorage.setItem("daftarBelanja", JSON.stringify(data));
        hitungTotal();
    }
}, false);

function saveData(){   
    localStorage.setItem('daftarBelanja', JSON.stringify(existingData));
}

function showTask(){
    const data = JSON.parse(localStorage.getItem("daftarBelanja"));
    list.innerHTML = "";
    data.forEach(item => {
        const li = document.createElement("li");
        li.classList.add("nama-belanja");
        li.innerHTML = item.nama;
        list.appendChild(li);

        hargaBarang = document.createElement("span");
        hargaBarang.innerHTML = "Rp. " + item.harga;
        hargaBarang.classList.add("harga");
        li.appendChild(hargaBarang);

        spanHapus = document.createElement("span");
        spanHapus.id = "hapus-item";
        spanHapus.innerHTML = "\u00d7";
        li.appendChild(spanHapus);
    });
}
showTask();
//hitung total Harga
function hitungTotal(){
    const data = JSON.parse(localStorage.getItem("daftarBelanja"));
    total = 0; 
    if (data && Array.isArray(data)) { 
        data.forEach(item => {
            total += item.harga;
        });
    }
    document.getElementById('total').innerText = 'Rp. ' + total;
}
hitungTotal();
//Imask JS
document.addEventListener('DOMContentLoaded', function() {
    var rupiahInput = document.getElementById('input-harga');
    var rupiahMaskOptions = {
        mask: 'Rp num',  // Pola masker
        blocks: {
            num: {  // Bagian numerik
                mask: Number,  // Tipe data Number
                thousandsSeparator: '.',  // Separator ribuan
                radix: ',',  // Separator desimal
                mapToRadix: [','],  // Pemetaan untuk separator desimal
                scale: 0,  // Tidak ada digit desimal
                max: 9999999999
            }
        }
    };
    var rupiahMask = IMask(rupiahInput, rupiahMaskOptions);  // Inisialisasi masker

    //Validasi
    rupiahInput.addEventListener('input', function(){
        var value = parseInt(rupiahMask.unmaskedValue); //Ambil nilai input tanpa mask atau tanpa Rp
        if(value > 9999999999){
            rupiahInput.value = 'Rp 9.999.999.999';
        }
    });
});


